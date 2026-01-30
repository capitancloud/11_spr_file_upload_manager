export type FileStatus = 'pending' | 'validating' | 'uploading' | 'success' | 'error';

export type FileValidationError = 'type' | 'size' | null;

export interface SimulatedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: FileStatus;
  progress: number;
  error: FileValidationError;
  errorMessage?: string;
  addedAt: Date;
}

export interface ValidationConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
}

export const DEFAULT_VALIDATION: ValidationConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

export const FILE_TYPE_NAMES: Record<string, string> = {
  'image/jpeg': 'Immagine JPEG',
  'image/png': 'Immagine PNG',
  'image/gif': 'Immagine GIF',
  'image/webp': 'Immagine WebP',
  'application/pdf': 'Documento PDF',
  'text/plain': 'File di testo',
  'application/msword': 'Documento Word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Documento Word',
};

export const FILE_TYPE_CATEGORIES: Record<string, string> = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/gif': 'image',
  'image/webp': 'image',
  'application/pdf': 'document',
  'text/plain': 'text',
  'application/msword': 'document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document',
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(type: string): string {
  const category = FILE_TYPE_CATEGORIES[type] || 'unknown';
  switch (category) {
    case 'image': return '🖼️';
    case 'document': return '📄';
    case 'text': return '📝';
    default: return '📎';
  }
}
