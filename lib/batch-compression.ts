import { compressImage, type CompressionOptions, type CompressionResult, type OutputFormat } from './image-compression';
export interface BatchItem { file: File; status: 'queued' | 'processing' | 'complete' | 'error' | 'cancelled'; result?: CompressionResult; error?: string }
export function validateBatchSelection(files: readonly Pick<File, 'size'>[]) {
  if (!files.length || files.length > 10) throw new Error('Choose 1–10 images per batch.');
  if (files.reduce((total, file) => total + file.size, 0) > 50_000_000) throw new Error('Keep the selected batch under 50 MB total.');
}
export function batchDownloadName(name: string, index: number, type: OutputFormat) {
  const base = name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').replace(/^[^a-zA-Z0-9]+|-+$/g, '').slice(0, 70) || 'thumbnail';
  return `${base}-${String(index + 1).padStart(2, '0')}-compressed.${type === 'image/jpeg' ? 'jpg' : type.split('/')[1]}`;
}
export async function compressBatch(files: File[], options: CompressionOptions, callbacks: { signal?: AbortSignal; onUpdate?: (index: number, item: BatchItem) => void; process?: typeof compressImage } = {}): Promise<BatchItem[]> {
  validateBatchSelection(files);
  const rows: BatchItem[] = files.map((file) => ({ file, status: 'queued' }));
  let outputBytes = 0;
  const update = (index: number, state: Omit<BatchItem, 'file'>) => { rows[index] = { file: files[index], ...state }; callbacks.onUpdate?.(index, rows[index]); };
  for (let index = 0; index < files.length; index++) {
    if (callbacks.signal?.aborted) { update(index, { status: 'cancelled' }); continue; }
    update(index, { status: 'processing' });
    try {
      if (files[index].size > 20_000_000) throw new Error('Choose an image under 20 MB.');
      const result = await (callbacks.process ?? compressImage)(files[index], options, callbacks.signal);
      if (callbacks.signal?.aborted) { update(index, { status: 'cancelled' }); continue; }
      if (outputBytes + result.blob.size > 60_000_000) throw new Error('Completed outputs would exceed 60 MB. Use a smaller batch or output format.');
      outputBytes += result.blob.size; update(index, { status: 'complete', result });
    } catch (cause) {
      if (callbacks.signal?.aborted) update(index, { status: 'cancelled' });
      else update(index, { status: 'error', error: cause instanceof Error ? cause.message : 'Could not process this image. Try another file.' });
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
  }
  return rows;
}
