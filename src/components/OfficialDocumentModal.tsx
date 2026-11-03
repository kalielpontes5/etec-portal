import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  QrCode,
  FileText
} from 'lucide-react';
import { Student, RequestItem } from '../types';

interface OfficialDocumentModalProps {
  student: Student;
  request?: RequestItem | null;
  onClose: () => void;
  onDownloaded: () => void;
}

export const OfficialDocumentModal: React.FC<OfficialDocumentModalProps> = ({
  student,
  request,
  onClose,
  onDownloaded
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    onDownloaded();
  };

  const todayStr = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const authCode = request?.authCode || 'CPS-ETEC-2026-89412-AUT';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in duration-150 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-[#1D2A44] px-6 py-3.5 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-white">
                Visualizador de Documento Oficial com Autenticação Digital
              </span>
              <span className="block text-[10px] text-slate-300">
                Chave ICP-Brasil · Certificação Digital do Centro Paula Souza
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
              title="Imprimir documento"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Salvar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Official Certificate */}
        <div 
          ref={printRef}
          className="p-8 sm:p-12 text-slate-800 bg-white max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible font-serif"
        >
          {/* Document Header with Logos */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-5 mb-8">
            <div className="h-16 flex items-center">
              <img 
                src="/assets/aistudio/IMG_3808_0a20c499.jpeg" 
                alt="ETEC" 
                className="h-12 w-auto object-contain"
              />
            </div>

            <div className="text-center font-sans">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-widest block">
                Governo do Estado de São Paulo
              </span>
              <span className="text-xs font-semibold text-[#002F6C] block">
                Centro Estadual de Educação Tecnológica Paula Souza - CEETEPS
              </span>
              <span className="text-[11px] text-slate-700 font-bold block mt-0.5">
                {student.unit}
              </span>
            </div>

            <div className="h-16 flex items-center">
              <img 
                src="/assets/aistudio/IMG_3809_9cc9d3ce.png" 
                alt="Governo de SP" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-8 font-sans">
            <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-widest text-slate-900 underline decoration-[#B21E27] decoration-2 underline-offset-8">
              Declaração de Matrícula
            </h1>
            <span className="font-mono text-xs text-slate-500 mt-2 block font-normal">
              Protocolo NSA: {request?.id || 'REQ-2026-4891'}
            </span>
          </div>

          {/* Body Text */}
          <div className="text-justify text-sm sm:text-base leading-relaxed space-y-4 mb-10 text-slate-800">
            <p>
              A Diretoria de Serviços da <strong>{student.unit}</strong>, pertencente ao <strong>Centro Estadual de Educação Tecnológica Paula Souza</strong>, declara, para os devidos fins de direito a quem interessar possa, que o(a) aluno(a):
            </p>

            {/* Student data box */}
            <div className="my-4 p-4 rounded bg-slate-50 border border-slate-300 font-sans text-xs sm:text-sm space-y-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Nome do Aluno:</span>
                  <span className="font-bold text-slate-900">{student.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Registro de Matrícula (RA):</span>
                  <span className="font-mono font-bold text-slate-900">{student.ra}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 block">Curso:</span>
                  <span className="font-bold text-slate-900">{student.course}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Módulo / Semestre Letivo:</span>
                  <span className="font-semibold text-slate-900">{student.module} - {student.academicYear}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-slate-500 block">Turno das Aulas:</span>
                  <span className="font-medium text-slate-800">{student.shift}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Situação Cadastral:</span>
                  <span className="font-bold text-emerald-800">Matrícula Ativa e Regular</span>
                </div>
              </div>
            </div>

            <p>
              Declara ainda que o referido estudante frequenta regularmente as aulas teóricas e práticas da matriz curricular vigente e encontra-se em cumprimento do calendário escolar legalmente homologado pela Coordenadoria do Ensino Médio e Técnico (CETEC/CPS).
            </p>

            <p>
              Por ser expressão da verdade, lavrou-se a presente declaração que vai devidamente assinada com certificação digital pelo responsável da Secretaria Acadêmica.
            </p>
          </div>

          {/* Date & Location */}
          <div className="text-right font-sans text-xs sm:text-sm text-slate-700 mb-10">
            São Paulo, {todayStr}.
          </div>

          {/* Digital Signature & Seal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end pt-6 border-t border-slate-200 font-sans">
            {/* Signature Box */}
            <div className="text-center sm:text-left space-y-1">
              <div className="w-48 border-b border-slate-800 mb-1 mx-auto sm:mx-0"></div>
              <p className="font-bold text-xs text-slate-900">Maria Aparecida Santos</p>
              <p className="text-[11px] text-slate-600">Secretária Acadêmica Reg. 48.912/CPS</p>
              <p className="text-[10px] text-slate-400">Assinado digitalmente conforme MP nº 2.200-2/2001</p>
            </div>

            {/* QR Code and Authenticity Seal */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-300 bg-slate-50 self-end">
              <div className="w-14 h-14 bg-white p-1 rounded border border-slate-300 flex items-center justify-center shrink-0">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[10px] leading-tight text-slate-600 space-y-0.5">
                <span className="font-bold text-slate-900 block text-[11px]">
                  Autenticação Digital CPS
                </span>
                <span className="font-mono text-slate-700 block font-bold">
                  {authCode}
                </span>
                <span className="text-slate-500 block">
                  Verifique a validade em: <em>cps.sp.gov.br/autenticidade</em>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center print:hidden">
          <span>Documento oficial expedido sem cobrança de taxas.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
