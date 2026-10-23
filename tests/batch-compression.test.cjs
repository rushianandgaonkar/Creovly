const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const Module=require('node:module');
const code=ts.transpileModule(fs.readFileSync('lib/batch-compression.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const loaded=new Module('batch'); loaded.require=()=>({compressImage:async()=>{throw Error('Unexpected browser processing');}}); loaded._compile(code,'batch.cjs');
const {validateBatchSelection,compressBatch,batchDownloadName}=loaded.exports;
const file=(name='image.png',size=5)=>new File([new Uint8Array(size)],name,{type:'image/png'});
const options={format:'image/jpeg',targetBytes:2000000,maxQuality:.9};
const output=(size=2)=>({blob:new Blob([new Uint8Array(size)],{type:'image/jpeg'}),width:1280,height:720,quality:.9,targetMet:true,originalUsed:false});
test('batch guards cap count and aggregate allocation without reading file contents',()=>{
 assert.throws(()=>validateBatchSelection([]),/1.*10/);
 assert.throws(()=>validateBatchSelection(Array(11).fill({size:1})),/1.*10/);
 assert.throws(()=>validateBatchSelection([{size:30000000},{size:20000001}]),/50 MB/);
 assert.doesNotThrow(()=>validateBatchSelection([{size:20000000},{size:20000000},{size:10000000}]));
});
test('serial batch continues after a file error and retains unmet-target outputs',async()=>{
 let active=0,max=0; const updates=[];
 const rows=await compressBatch([file('a.png'),file('bad.png'),file('b.png')],options,{onUpdate:(index,row)=>updates.push([index,row.status]),process:async(f)=>{active++;max=Math.max(max,active);await new Promise(r=>setTimeout(r,1));active--;if(f.name==='bad.png')throw Error('Damaged file');return {...output(),targetMet:false};}});
 assert.equal(max,1);assert.deepEqual(rows.map(r=>r.status),['complete','error','complete']);assert.match(rows[1].error,/Damaged/);assert.equal(rows[0].result.targetMet,false);assert.ok(updates.some(([i,s])=>i===1&&s==='error'));
});
test('cancellation retains completed files, drops late results and does not start queued work',async()=>{
 const controller=new AbortController();let calls=0;
 const rows=await compressBatch([file(),file(),file()],options,{signal:controller.signal,process:async()=>{calls++;if(calls===2)controller.abort();return output();}});
 assert.equal(calls,2);assert.deepEqual(rows.map(r=>r.status),['complete','cancelled','cancelled']);assert.equal(rows[1].result,undefined);
 const cancelled=await compressBatch([file()],options,{signal:controller.signal,process:async()=>{throw Error('Must not run');}});
 assert.equal(cancelled[0].status,'cancelled');
});
test('oversized inputs and aggregate outputs fail individually and do not enter archive results',async()=>{
 let calls=0;
 const rows=await compressBatch([{name:'too-large.png',size:20000001},file(),file()],options,{process:async()=>{calls++;return output(31000000);}});
 assert.equal(calls,2);assert.deepEqual(rows.map(r=>r.status),['error','complete','error']);assert.match(rows[0].error,/20 MB/);assert.match(rows[2].error,/60 MB/);assert.equal(rows[2].result,undefined);
});
test('download names are safe, distinct across colliding and Unicode filenames, and use actual output type',()=>{
 const a=batchDownloadName('../My logo.png',0,'image/jpeg');const b=batchDownloadName('../My logo.png',1,'image/jpeg');
 assert.notEqual(a,b);assert.match(a,/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,119}$/);assert.ok(a.endsWith('.jpg'));assert.ok(batchDownloadName('😀.jpg',0,'image/png').endsWith('.png'));
});
test('generated filenames including leading underscores are accepted by the actual ZIP writer',async()=>{
 const zipCode=ts.transpileModule(fs.readFileSync('lib/studio-zip.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const zipModule=new Module('zip');zipModule._compile(zipCode,'zip.cjs');
 const names=['_logo.png','___.png','../logo.png','logo.png','logo.png'].map((name,index)=>batchDownloadName(name,index,'image/jpeg'));
 for(const name of names)assert.match(name,/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,119}$/);
 const zip=await zipModule.exports.createStudioZip(names.map(name=>({name,blob:output().blob})));
 assert.equal(zip.type,'application/zip');assert.ok(zip.size>0);
});
