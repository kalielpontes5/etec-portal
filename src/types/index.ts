export type RequestStatus = 
  | 'em_analise'
  | 'em_processamento'
  | 'pronto_retirada'
  | 'concluido'
  | 'cancelado';

export type DeliveryMode = 'digital' | 'presencial';

export interface Student {
  id: string;
  name: string;
  ra: string;
  cpf: string;
  email: string;
  phone: string;
  course: string;
  courseType: string;
  module: string;
  shift: string;
  unit: string;
  unitCode: string;
  academicYear: string;
  status: 'Ativo' | 'Trancado' | 'Concluído';
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServiceType {
  id: string;
  title: string;
  category: 'documentos' | 'transporte' | 'matricula' | 'atestados';
  categoryLabel: string;
  estimatedDays: number;
  deliveryOptions: DeliveryMode[];
  description: string;
  requiresAttachment: boolean;
  attachmentInstructions?: string;
  iconName: string;
  badge?: string;
}

export interface AttachmentFile {
  name: string;
  size: string;
  type: string;
}

export interface TimelineEvent {
  status: RequestStatus;
  title: string;
  date: string;
  description: string;
  responsible?: string;
}

export interface RequestItem {
  id: string; // Ex: REQ-2026-9812
  serviceId: string;
  serviceTitle: string;
  category: string;
  studentId: string;
  studentName: string;
  studentRa: string;
  createdAt: string;
  updatedAt: string;
  estimatedCompletion: string;
  status: RequestStatus;
  deliveryMode: DeliveryMode;
  notes: string;
  attachments: AttachmentFile[];
  timeline: TimelineEvent[];
  pickupLocation?: string;
  secretaryFeedback?: string;
  authCode?: string;
  digitalDocumentAvailable?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'prazos' | 'transporte' | 'secretaria' | 'documentos';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
