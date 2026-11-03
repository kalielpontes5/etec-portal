import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Mail, 
  Phone, 
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { Student, RequestItem } from '../types';

interface StudentProfileCardProps {
  student: Student;
  requests: RequestItem[];
  onOpenNewRequest: () => void;
  onOpenQuickDocument: () => void;
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  student,
  requests,
  onOpenNewRequest,
  onOpenQuickDocument
}) => {
  const inAnalysis = requests.filter(r => r.status === 'em_analise').length;
  const inProcessing = requests.filter(r => r.status === 'em_processamento').length;
  const readyPickup = requests.filter(r => r.status === 'pronto_retirada').length;
  const completed = requests.filter(r => r.status === 'concluido').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Banner with CPS/ETEC identity */}
      <div className="bg-gradient-to-r from-[#1D2A44] via-[#002F6C] to-[#1D2A44] px-6 py-4 text-white relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              <GraduationCap className="w-6 h-6 text-slate-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-red-300 font-semibold">
                  Matrícula Regular
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" /> Ativo
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {student.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
            <Calendar className="w-3.5 h-3.5 text-red-300" />
            <span>Ano Letivo: <strong>{student.academicYear}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Academic info */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 block mb-0.5 font-medium">Curso Técnico</span>
              <span className="font-semibold text-slate-900 text-sm block">
                {student.course}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {student.courseType}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 block mb-0.5 font-medium">Registro do Aluno (RA)</span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {student.ra}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-[#002F6C] font-semibold border border-blue-200">
                  {student.module}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Turno: {student.shift}
              </span>
            </div>
          </div>

          {/* Unit and Contact Details */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{student.unit} ({student.unitCode})</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-slate-700">{student.email}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{student.phone}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Service Highlights */}
        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Acesso Imediato
            </span>
            <p className="text-xs text-slate-600 mb-3">
              Precisa comprovar vínculo para estágio ou transporte? Obtenha seu comprovante oficial com verificação online.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={onOpenQuickDocument}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg bg-[#002F6C] text-white hover:bg-[#00224f] transition-all shadow-xs"
            >
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-200" />
                <span>Declaração de Matrícula (PDF)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-200" />
            </button>

            <button
              onClick={onOpenNewRequest}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg bg-red-50 text-[#B21E27] hover:bg-red-100 border border-red-200 transition-colors"
            >
              <span>Solicitar Outro Documento</span>
              <ChevronRight className="w-4 h-4 text-[#B21E27]" />
            </button>
          </div>
        </div>
      </div>

      {/* Requests Counters Strip */}
      <div className="bg-slate-50/80 border-t border-slate-200 px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="border-r border-slate-200 last:border-none pr-2">
          <span className="text-slate-500 text-xs block">Em Análise</span>
          <span className="text-lg font-bold text-amber-600">{inAnalysis}</span>
        </div>
        <div className="border-r border-slate-200 last:border-none pr-2">
          <span className="text-slate-500 text-xs block">Em Processamento</span>
          <span className="text-lg font-bold text-blue-600">{inProcessing}</span>
        </div>
        <div className="border-r border-slate-200 last:border-none pr-2">
          <span className="text-slate-500 text-xs block">Pronto p/ Retirada</span>
          <span className="text-lg font-bold text-purple-600">{readyPickup}</span>
        </div>
        <div>
          <span className="text-slate-500 text-xs block">Concluídos</span>
          <span className="text-lg font-bold text-emerald-600">{completed}</span>
        </div>
      </div>
    </div>
  );
};
