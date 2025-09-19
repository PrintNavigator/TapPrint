// Shared types for TapPrint applications

// Common API types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

// Layout and printing types
export interface Layout {
  id: string;
  name: string;
  description?: string;
  content: {
    data: any; // PDFme template data
    version: string;
  };
  categoryId?: string;
  userId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PrintSet {
  id: string;
  name: string;
  layoutId: string;
  categoryId?: string;
  data: any[]; // Array of data to print
  settings: PrintSettings;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrintSettings {
  copies: number;
  printerName?: string;
  paperSize: string;
  orientation: 'portrait' | 'landscape';
  quality: 'draft' | 'normal' | 'high';
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Printer types
export interface Printer {
  name: string;
  description: string;
  location?: string;
  makeModel: string;
  status: 'idle' | 'printing' | 'stopped' | 'error';
  isDefault: boolean;
  capabilities: PrinterCapabilities;
}

export interface PrinterCapabilities {
  paperSizes: string[];
  resolutions: string[];
  duplex: boolean;
  color: boolean;
}

// WebSocket message types
export interface WebSocketMessage {
  type: 'print_status' | 'printer_update' | 'error';
  data: any;
  timestamp: string;
}

// PDF generation types
export interface PDFGenerationRequest {
  layoutId: string;
  data: any[];
  settings: PrintSettings;
}

export interface PDFGenerationResponse {
  success: boolean;
  pdfUrl?: string;
  fileName?: string;
  error?: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Export utility types
export type CreateLayoutInput = Omit<Layout, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLayoutInput = Partial<CreateLayoutInput>;
export type CreatePrintSetInput = Omit<PrintSet, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePrintSetInput = Partial<CreatePrintSetInput>;