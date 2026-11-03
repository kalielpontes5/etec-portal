import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Building, 
  Laptop, 
  Calendar, 
  FileText, 
  FileDown, 
  User, 
  ShieldCheck, 
  AlertCircle,
  XCircle,
  Share2
} from 'lucide-react';
import { RequestItem } from '../types';

interface RequestDetailModalProps {
  request: RequestItem | null;
  onClose: () => void;
  onCancelRequest: (requestId: string) => void;
  onDownloadDocument: (request: RequestItem) => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  request,
  onClose,
  onCancelRequest,
  onDownloadDocument
}) => {
  if (!request) return null;

  const getStatusBadge = (status: RequestItem['status']) => {
    switch (status) {
      case 'em_analise':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Em Análise pela Secretaria
          </span>
        );
      case 'em_processamento':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Em Confecção / Processamento
          </span>
        );
      case 'pronto_retirada':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Disponível para Retirada no Balcão
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Concluído
          </span>
        );
      case 'cancelado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            Solicitação Cancelada
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1D2A44] px-6 py-4 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-red-300">
                {request.id}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-300">{request.category}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {request.serviceTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status & Timing Highlight */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Situação Atual
              </span>
              <div>{getStatusBadge(request.status)}</div>
            </div>

            <div className="text-xs text-slate-600 sm:text-right space-y-0.5">
              <p>Abertura: <strong>{new Date(request.createdAt).toLocaleDateString('pt-BR')}</strong></p>
              <p>Previsão: <strong>{new Date(request.estimatedCompletion).toLocaleDateString('pt-BR')}</strong></p>
              <p className="text-[11px] text-slate-400">
                {request.deliveryMode === 'digital' ? 'Entrega Online / Digital' : 'Retirada no Balcão'}
              </p>
            </div>
          </div>

          {/* Secretary Feedback if available */}
          {request.secretaryFeedback && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Despacho da Secretaria Acadêmica</span>
              </div>
              <p className="leading-relaxed pl-5 text-blue-900">
                "{request.secretaryFeedback}"
              </p>
            </div>
          )}

          {/* Pickup location notice if presencial */}
          {request.deliveryMode === 'presencial' && request.pickupLocation && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Building className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Local de Retirada Presencial:</span>
                <span>{request.pickupLocation}</span>
                <span className="block text-[11px] text-amber-700/80 mt-0.5">
                  Horário de funcionamento: Seg a Sex, das 08h00 às 21h30.
                </span>
              </div>
            </div>
          )}

          {/* Timeline of events */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Histórico e Andamento do Chamado
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {request.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white border-2 border-[#002F6C] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002F6C]"></div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{step.title}</span>
                      <span className="font-mono text-[11px] text-slate-400">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                    {step.responsible && (
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Responsável: {step.responsible}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observations and details */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800">
              Observações Informadas pelo Aluno
            </h4>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {request.notes}
            </div>
          </div>

          {/* Attachments Section */}
          {request.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800">
                Documentos Anexados ({request.attachments.length})
              </h4>
              <div className="space-y-1.5">
                {request.attachments.map((file, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{file.name}</span>
                      <span className="text-slate-400 font-mono text-[11px]">({file.size})</span>
                    </div>
                    <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                      Anexo verificado
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Digital Authentication Code if available */}
          {request.authCode && (
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  Autenticidade Eletrônica CPS
                </span>
                <span className="font-mono font-bold text-emerald-950 text-xs">
                  {request.authCode}
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                Válido em todo território nacional
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Protocolo oficial SIGA/NSA · Centro Paula Souza
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Cancel Button if under analysis */}
            {request.status === 'em_analise' && (
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja cancelar esta solicitação?')) {
                    onCancelRequest(request.id);
                    onClose();
                  }
                }}
                className="px-3.5 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancelar Solicitação</span>
              </button>
            )}

            {/* Download Digital Document */}
            {request.digitalDocumentAvailable && (
              <button
                onClick={() => {
                  onDownloadDocument(request);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <FileDown className="w-4 h-4" />
                <span>Emitir / Baixar Documento</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
