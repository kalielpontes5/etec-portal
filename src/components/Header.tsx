import React, { useState } from 'react';
import { 
  FileText, 
  PlusCircle, 
  Clock, 
  HelpCircle, 
  Menu, 
  X, 
  Bell, 
  School,
  LogOut,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { Student } from '../types';

interface HeaderProps {
  currentTab: 'dashboard' | 'new-request' | 'requests-list' | 'faq';
  onSelectTab: (tab: 'dashboard' | 'new-request' | 'requests-list' | 'faq') => void;
  student: Student;
  activeRequestsCount: number;
}

interface NavItem {
  id: 'dashboard' | 'new-request' | 'requests-list' | 'faq';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  badge?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  student,
  activeRequestsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Painel Geral', icon: School },
    { id: 'new-request', label: 'Nova Solicitação', icon: PlusCircle, highlight: true },
    { id: 'requests-list', label: 'Meus Protocolos', icon: Clock, badge: activeRequestsCount },
    { id: 'faq', label: 'Dúvidas & Secretaria', icon: HelpCircle }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Governmental Bar */}
      <div className="bg-[#1D2A44] text-white text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider text-slate-200">SÃO PAULO</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">Governo do Estado de São Paulo</span>
          <span className="text-slate-400 hidden md:inline">·</span>
          <span className="text-slate-400 hidden md:inline">Secretaria de Ciência, Tecnologia e Inovação</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span className="hidden sm:inline">Sistema Operacional:</span> Online
          </span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span className="hover:text-white transition-colors cursor-pointer hidden sm:inline">Acessibilidade</span>
        </div>
      </div>

      {/* Main Header with Official Branding & Logos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Official Logos Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div 
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
              title="Voltar ao início"
            >
              {/* ETEC Logo */}
              <div className="h-10 sm:h-12 flex items-center justify-center p-1 bg-white rounded border border-slate-100 hover:border-slate-300 transition-colors">
                <img 
                  src="/assets/aistudio/IMG_3808_0a20c499.jpeg" 
                  alt="ETEC - Escola Técnica Estadual" 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

              {/* Centro Paula Souza & SP Logo */}
              <div className="h-10 sm:h-12 flex items-center justify-center p-1 bg-white rounded border border-slate-100 hover:border-slate-300 transition-colors">
                <img 
                  src="/assets/aistudio/IMG_3809_9cc9d3ce.png" 
                  alt="Centro Paula Souza - Governo do Estado de São Paulo" 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Title / Portal Badge */}
            <div className="hidden lg:block pl-2 border-l border-slate-200">
              <h1 className="text-base font-bold text-[#1D2A44] leading-tight flex items-center gap-2">
                Atendimento ao Aluno
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-[#B21E27] border border-red-200">
                  Secretaria Digital
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                {student.unit}
              </p>
            </div>
          </div>

          {/* Desktop Right: Student info & Quick actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Button New Request */}
            <button
              onClick={() => onSelectTab('new-request')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#B21E27] text-white hover:bg-[#8C141C] shadow-sm hover:shadow transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#B21E27]/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nova Solicitação</span>
            </button>

            {/* Student Dropdown / Profile pill */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#002F6C] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                  LS
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">
                    {student.name}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span>RA: {student.ra}</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium">Regular</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{student.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{student.email}</p>
                    <div className="mt-2 text-[11px] bg-slate-50 p-2 rounded border border-slate-200 text-slate-600 space-y-0.5">
                      <p className="font-medium text-slate-800">{student.course}</p>
                      <p>{student.module} · {student.shift}</p>
                      <p className="text-slate-500">{student.unit}</p>
                    </div>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={() => onSelectTab('dashboard')}
                      className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-slate-400" />
                      Visualizar Perfil Completo
                    </button>
                    <button 
                      onClick={() => onSelectTab('requests-list')}
                      className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      Meus Protocolos ({activeRequestsCount} ativos)
                    </button>
                  </div>
                  <div className="pt-1 border-t border-slate-100">
                    <div className="px-4 py-1.5 text-[11px] text-slate-400">
                      Ambiente Acadêmico Conectado
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onSelectTab('new-request')}
              className="p-2 text-white bg-[#B21E27] rounded-lg text-xs font-semibold"
              title="Nova Solicitação"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-none py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    relative flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors
                    ${isActive 
                      ? 'text-[#B21E27] bg-white shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#B21E27]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`
                      ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold
                      ${isActive ? 'bg-[#B21E27] text-white' : 'bg-slate-200 text-slate-700'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#B21E27]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 py-2">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              NSA & Siga Integrados
            </span>
            <span>·</span>
            <span>Atendimento: 08h às 21h30</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          {/* Mobile Student card */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#002F6C] text-white flex items-center justify-center font-bold text-sm">
                LS
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{student.name}</p>
                <p className="text-[11px] text-slate-500">RA: {student.ra} · {student.module}</p>
                <p className="text-[11px] text-slate-600">{student.course}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium
                    ${isActive 
                      ? 'bg-red-50 text-[#B21E27] font-semibold border border-red-200' 
                      : 'text-slate-700 hover:bg-slate-100'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#B21E27]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#B21E27] text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
            {student.unit}
          </div>
        </div>
      )}
    </header>
  );
};
