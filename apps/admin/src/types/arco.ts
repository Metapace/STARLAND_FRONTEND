export interface UploadItem {
  percent?: number;
  name?: string;
  uid: string;
  url?: string;
  originFile?: string;
  response: Record<string, unknown>;
  status: 'init' | 'uploading' | 'done' | 'error';
}
