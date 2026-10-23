const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'); const ts=require('typescript'); const Module=require('node:module');
const moduleUnderTest=new Module('polaroid-navigation');
moduleUnderTest._compile(ts.transpileModule(fs.readFileSync('lib/polaroid-navigation.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,'polaroid-navigation.cjs');
const {nearestCard,clampCard,stringY}=moduleUnderTest.exports;
test('navigation clamps at either end and handles empty content',()=>{
 assert.equal(clampCard(-1,9),0); assert.equal(clampCard(9,9),8); assert.equal(clampCard(5,0),0);
});
test('scroll selection chooses closest card with ordered offsets and clamps at the end',()=>{
 assert.equal(nearestCard(0,[0,300,600]),0); assert.equal(nearestCard(170,[0,300,600]),1);
 assert.equal(nearestCard(1000,[0,300,600]),2); assert.equal(nearestCard(0,[]),0);
});
test('hanging string has matching endpoints and a centered sag without overshooting outside viewport',()=>{
 assert.equal(stringY(0,1000,24),0); assert.equal(stringY(1000,1000,24),0);
 assert.equal(stringY(500,1000,24),24); assert.equal(stringY(-500,1000,24),0);
 assert.equal(stringY(500,0,24),0);
});
