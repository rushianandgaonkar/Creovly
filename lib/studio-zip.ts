const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let crc = index;
  for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  return crc >>> 0;
});

/** Small ZIP STORE writer for a few local project files (no compression/ZIP64). */
export async function createStudioZip(files: { name: string; blob: Blob }[]): Promise<Blob> {
  if (!files.length || files.length > 20 || files.reduce((sum, file) => sum + file.blob.size, 0) > 64_000_000) throw new Error('Package must contain 1–20 files and stay under 64 MB.');
  const encoder = new TextEncoder(); const local: BlobPart[] = []; const central: BlobPart[] = []; let offset = 0; let centralSize = 0;
  const names = new Set<string>();
  for (const file of files) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,119}$/.test(file.name) || names.has(file.name)) throw new Error('Package contains an invalid or duplicate filename.');
    names.add(file.name);
    const name = encoder.encode(file.name); const bytes = new Uint8Array(await file.blob.arrayBuffer());
    let crc = 0xffffffff;
    for (const byte of bytes) crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
    crc = (crc ^ 0xffffffff) >>> 0;
    const header = new Uint8Array(30 + name.length); const h = new DataView(header.buffer);
    h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x800, true); h.setUint16(12, 33, true);
    h.setUint32(14, crc, true); h.setUint32(18, bytes.length, true); h.setUint32(22, bytes.length, true); h.setUint16(26, name.length, true); header.set(name, 30);
    local.push(header, bytes);
    const entry = new Uint8Array(46 + name.length); const c = new DataView(entry.buffer);
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x800, true); c.setUint16(14, 33, true);
    c.setUint32(16, crc, true); c.setUint32(20, bytes.length, true); c.setUint32(24, bytes.length, true); c.setUint16(28, name.length, true); c.setUint32(42, offset, true); entry.set(name, 46);
    central.push(entry); centralSize += entry.length; offset += header.length + bytes.length;
  }
  const end = new Uint8Array(22); const e = new DataView(end.buffer);
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, centralSize, true); e.setUint32(16, offset, true);
  return new Blob([...local, ...central, end], { type: 'application/zip' });
}
