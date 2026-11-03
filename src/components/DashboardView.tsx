import React from 'react';
import { 
  FileText, 
  Bus, 
  GraduationCap, 
  HeartPulse, 
  IdCard, 
  PauseCircle, 
  BookOpenCheck,
  Award,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Student, RequestItem, ServiceType } from '../types';
import { AVAILABLE_SERVICES, SECRETARY_NOTICES } from '../data/mockData';
import { StudentProfileCard } from './StudentProfileCard';

interface DashboardViewProps {
  student: Student;
  requests: RequestItem[];
  onOpenNewRequest: (serviceId?: string) => void;
  onViewRequestDetail: (request: RequestItem) => void;
  onOpenQuickDocument: () => void;
  onNavigateToTab: (tab: 'dashboard' | 'new-request' | 'requests-list' | 'faq') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  requests,
  onOpenNewRequest,
  onViewRequestDetail,
  onOpenQuickDocument,
  onNavigateToTab
}) => {
  // Service icon resolver
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck': return FileText;
      case 'Bus': return Bus;
      case 'GraduationCap': return GraduationCap;
      case 'HeartPulse': return HeartPulse;
      case 'IdCard': return IdCard;
      case 'PauseCircle': return PauseCircle;
      case 'BookOpenCheck': return BookOpenCheck;
      case 'Award': return Award;
      default: return FileText;
    }
  };

  const recentRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);

  const getStatusBadge = (status: RequestItem['status']) => {
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
            Pronto para Retirada
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Cancelado
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Student Profile Card */}
      <StudentProfileCard 
        student={student}
        requests={requests}
        onOpenNewRequest={() => onOpenNewRequest()}
        onOpenQuickDocument={onOpenQuickDocument}
      />

      {/* Main Grid: Services Catalog & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Quick Services */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Serviços da Secretaria
                <span className="text-xs font-normal text-slate-500">
                  (Selecione para solicitar)
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Emissão eletrônica de documentos e requerimentos acadêmicos oficiais.
              </p>
            </div>
            <button
              onClick={() => onOpenNewRequest()}
              className="text-xs font-semibold text-[#B21E27] hover:text-[#8C141C] flex items-center gap-1"
            >
              Ver todos os serviços
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AVAILABLE_SERVICES.slice(0, 6).map((service) => {
              const Icon = getServiceIcon(service.iconName);
              return (
                <div
                  key={service.id}
                  onClick={() => onOpenNewRequest(service.id)}
                  className="group relative bg-white p-4 rounded-xl border border-slate-200 hover:border-[#B21E27]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-[#B21E27] flex items-center justify-center group-hover:bg-[#B21E27] group-hover:text-white transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      {service.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-[#B21E27]">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#B21E27] transition-colors line-clamp-1">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Prazo: {service.estimatedDays} {service.estimatedDays === 1 ? 'dia útil' : 'dias úteis'}
                    </span>
                    <span className="font-semibold text-[#B21E27] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Solicitar
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner: Bilhete Único / Transporte Notice */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5" />
                Transporte Escolar 2026/1
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Solicitação de Bilhete Único Estudante (SPTrans e EMTU)
              </h4>
              <p className="text-xs text-blue-100 max-w-xl">
                O envio do formulário de matrícula para concessão do Passe Livre ou Meia Tarifa é realizado pela secretaria em até 3 dias úteis.
              </p>
            </div>
            <button
              onClick={() => onOpenNewRequest('passe_escolar')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-colors shadow-xs whitespace-nowrap self-start sm:self-auto"
            >
              Pedir Passe Escolar
            </button>
          </div>
        </div>

        {/* Right Column: Recent Requests & Notices */}
        <div className="space-y-6">
          {/* Recent Requests Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B21E27]" />
                Chamados Recentes
              </h3>
              <button
                onClick={() => onNavigateToTab('requests-list')}
                className="text-xs font-semibold text-[#002F6C] hover:underline"
              >
                Ver todos
              </button>
            </div>

            {recentRequests.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Nenhuma solicitação encontrada.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentRequests.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => onViewRequestDetail(req)}
                    className="py-3 hover:bg-slate-50 transition-colors cursor-pointer group flex flex-col gap-1.5 rounded-lg px-2 -mx-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-slate-500">
                        {req.id}
                      </span>
                      {getStatusBadge(req.status)}
                    </div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-[#B21E27] transition-colors truncate">
                      {req.serviceTitle}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{new Date(req.createdAt).toLocaleDateString('pt-BR')}</span>
                      <span className="font-medium text-slate-600 group-hover:text-slate-900 flex items-center gap-1">
                        Ver detalhes
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Secretary Notices Board */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Mural da Secretaria
              </h3>
              <span className="text-[10px] text-slate-400">Atualizado hoje</span>
            </div>

            <div className="space-y-3">
              {SECRETARY_NOTICES.map((notice) => (
                <div 
                  key={notice.id} 
                  className={`p-3 rounded-lg border text-xs ${
                    notice.important 
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-slate-900 text-xs">
                      {notice.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {notice.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule & Contact Box */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-[#B21E27]" />
              <span>Atendimento Presencial da Secretaria</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Bloco Administrativo - Térreo. Retirada de carteirinhas e documentos físicos:
            </p>
            <div className="text-[11px] text-slate-700 space-y-0.5 font-medium bg-white p-2.5 rounded border border-slate-200">
              <p>• Manhã: 08h00 às 11h30</p>
              <p>• Tarde: 13h30 às 17h00</p>
              <p>• Noite: 18h30 às 21h30</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
