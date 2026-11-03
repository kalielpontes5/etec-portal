import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  Bus, 
  Building, 
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';
import { Student } from '../types';

interface FaqViewProps {
  student: Student;
  onOpenNewRequest: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ student, onOpenNewRequest }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#B21E27] border border-red-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Central de Ajuda e Informações Oficiais</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Como podemos ajudar você hoje?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Consulte os prazos oficiais do Centro Paula Souza, procedimentos de atendimento e canais da Secretaria Escolar.
        </p>

        {/* Search input */}
        <div className="relative max-w-lg mx-auto pt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 mt-1.5 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite sua dúvida (ex: prazo do passe escolar, atestado, trancamento)..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#B21E27] focus:ring-2 focus:ring-[#B21E27]/20 shadow-xs"
          />
        </div>
      </div>

      {/* Office Hours & Channels Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Horários */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 text-[#B21E27] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Horários de Atendimento</h3>
            <p className="text-xs text-slate-500 mt-0.5">Segunda a Sexta-feira:</p>
          </div>
          <div className="text-xs text-slate-700 space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-500">Período Matutino:</span>
              <span className="font-semibold">08h00 às 11h30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Período Vespertino:</span>
              <span className="font-semibold">13h30 às 17h00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Período Noturno:</span>
              <span className="font-semibold">18h30 às 21h30</span>
            </div>
          </div>
        </div>

        {/* Card 2: Localização */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#002F6C] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Guichês Presenciais</h3>
            <p className="text-xs text-slate-500 mt-0.5">{student.unit}</p>
          </div>
          <div className="text-xs text-slate-600 space-y-1 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <p className="font-semibold text-slate-800">Bloco A - Prédio Central (Térreo)</p>
            <p>Guichês 01 e 02: Atendimento Geral e Retirada de Documentos</p>
            <p>Guichê 03: Estágio Supervisionado e TCC</p>
          </div>
        </div>

        {/* Card 3: Contatos Diretos */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Canais Oficiais</h3>
            <p className="text-xs text-slate-500 mt-0.5">Secretaria Escolar ETEC</p>
          </div>
          <div className="space-y-1.5 text-xs">
            <a 
              href="mailto:secretaria.academica@etec.sp.gov.br" 
              className="flex items-center gap-2 p-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">secretaria@etec.sp.gov.br</span>
            </a>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-200 text-slate-700">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>(11) 2209-1234 / Ramal 204</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none py-1">
        {[
          { id: 'todos', label: 'Todas as Dúvidas' },
          { id: 'prazos', label: 'Prazos de Emissão' },
          { id: 'transporte', label: 'Bilhete Único / EMTU' },
          { id: 'secretaria', label: 'Atendimento e Retirada' },
          { id: 'documentos', label: 'Autenticidade e Diplomas' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors
              ${activeCategory === cat.id 
                ? 'bg-[#B21E27] text-white shadow-xs' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Nenhuma dúvida encontrada para o termo pesquisado.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div key={faq.id} className="transition-colors">
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100 animate-in fade-in duration-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick Help Footer Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1D2A44] to-[#002F6C] text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h4 className="text-base font-bold text-white">Não encontrou o que precisava?</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Abra um chamado diretamente com a secretaria e receba o parecer no seu portal.
          </p>
        </div>
        <button
          onClick={onOpenNewRequest}
          className="px-5 py-2.5 text-xs font-bold rounded-lg bg-[#B21E27] text-white hover:bg-[#8C141C] shadow-xs transition-colors shrink-0"
        >
          Criar Nova Solicitação
        </button>
      </div>
    </div>
  );
};
