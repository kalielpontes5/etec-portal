import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  FileDown, 
  XCircle, 
  PlusCircle, 
  FileText,
  Calendar,
  Building,
  Laptop,
  ArrowUpDown
} from 'lucide-react';
import { RequestItem, RequestStatus } from '../types';

interface RequestsListViewProps {
  requests: RequestItem[];
  onViewDetail: (request: RequestItem) => void;
  onOpenNewRequest: () => void;
  onCancelRequest: (requestId: string) => void;
  onDownloadDocument: (request: RequestItem) => void;
}

export const RequestsListView: React.FC<RequestsListViewProps> = ({
  requests,
  onViewDetail,
  onOpenNewRequest,
  onCancelRequest,
  onDownloadDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | RequestStatus>('todos');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'todos' || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'em_analise':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Em Análise
          </span>
        );
      case 'em_processamento':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Em Andamento
          </span>
        );
      case 'pronto_retirada':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            Pronto p/ Retirada
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Concluído
          </span>
        );
      case 'cancelado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            Cancelado
          </span>
        );
    }
  };

  const statusTabs = [
    { id: 'todos', label: 'Todos os Pedidos', count: requests.length },
    { id: 'em_analise', label: 'Em Análise', count: requests.filter(r => r.status === 'em_analise').length },
    { id: 'em_processamento', label: 'Em Andamento', count: requests.filter(r => r.status === 'em_processamento').length },
    { id: 'pronto_retirada', label: 'Pronto p/ Retirada', count: requests.filter(r => r.status === 'pronto_retirada').length },
    { id: 'concluido', label: 'Concluídos', count: requests.filter(r => r.status === 'concluido').length },
  ] as const;

  return (
    <div className="space-y-6 pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Central de Acompanhamento de Protocolos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitore o andamento, pareceres da secretaria e faça download dos seus documentos digitais.
          </p>
        </div>

        <button
          onClick={onOpenNewRequest}
          className="px-4 py-2.5 text-xs font-bold rounded-lg bg-[#B21E27] text-white hover:bg-[#8C141C] shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Nova Solicitação</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise por protocolo (ex: REQ-2026-4891), serviço ou palavra-chave..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#B21E27] focus:ring-1 focus:ring-[#B21E27]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Status Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          {statusTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5
                ${statusFilter === tab.id 
                  ? 'bg-[#002F6C] text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'}
              `}
            >
              <span>{tab.label}</span>
              <span className={`
                text-[10px] px-1.5 py-0.2 rounded-full font-bold
                ${statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Requests List Table / Cards */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            Nenhum protocolo encontrado
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
            {searchTerm || statusFilter !== 'todos'
              ? 'Tente ajustar os filtros ou o termo de busca para localizar seu chamado.'
              : 'Você ainda não realizou solicitações neste período letivo.'}
          </p>
          <button
            onClick={onOpenNewRequest}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#B21E27] text-white hover:bg-[#8C141C] transition-colors"
          >
            Abrir Minha Primeira Solicitação
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    {req.id}
                  </span>
                  {getStatusBadge(req.status)}
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto md:ml-0">
                    <Calendar className="w-3.5 h-3.5" />
                    Aberto em {new Date(req.createdAt).toLocaleDateString('pt-BR')} às {new Date(req.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#B21E27] transition-colors cursor-pointer"
                      onClick={() => onViewDetail(req)}>
                    {req.serviceTitle}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {req.notes}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    {req.deliveryMode === 'digital' ? (
                      <>
                        <Laptop className="w-3.5 h-3.5 text-[#002F6C]" />
                        <span>Formato Digital (Online)</span>
                      </>
                    ) : (
                      <>
                        <Building className="w-3.5 h-3.5 text-amber-700" />
                        <span>Retirada Presencial (Secretaria)</span>
                      </>
                    )}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-medium text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Previsão: {new Date(req.estimatedCompletion).toLocaleDateString('pt-BR')}
                  </span>
                  {req.attachments.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-slate-500">
                        {req.attachments.length} anexo(s)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                {/* View Details Button */}
                <button
                  onClick={() => onViewDetail(req)}
                  className="px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ver Detalhes</span>
                </button>

                {/* If digital doc available or completed */}
                {req.digitalDocumentAvailable && (
                  <button
                    onClick={() => onDownloadDocument(req)}
                    className="px-3 py-2 text-xs font-bold rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Baixar Documento</span>
                  </button>
                )}

                {/* Cancel action if in 'em_analise' */}
                {req.status === 'em_analise' && (
                  <>
                    {confirmCancelId === req.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                        <span className="text-[11px] text-red-700 font-semibold px-1">Confirmar?</span>
                        <button
                          onClick={() => {
                            onCancelRequest(req.id);
                            setConfirmCancelId(null);
                          }}
                          className="px-2 py-1 text-[11px] font-bold rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="px-2 py-1 text-[11px] font-semibold rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                        >
                          Não
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmCancelId(req.id)}
                        className="px-3 py-2 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-1"
                        title="Cancelar esta solicitação"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancelar</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
