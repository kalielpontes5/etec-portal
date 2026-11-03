import React from 'react';
import { ShieldCheck, ExternalLink, School, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D2A44] text-slate-300 text-xs border-t border-slate-700/60 print:hidden mt-auto">
      {/* Upper Footer: Quick Links & Institutional Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Institutional */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">ETEC · Centro Paula Souza</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sistema Integrado de Atendimento ao Estudante. Gestão acadêmica e emissão oficial de documentos escolares.
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              <p>Autarquia do Governo do Estado de São Paulo vinculada à Secretaria de Ciência, Tecnologia e Inovação.</p>
            </div>
          </div>

          {/* Col 2: Serviços Acadêmicos */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Serviços Rápidos
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">
                Declaração de Matrícula Digital
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Validação de Bilhete Único SPTrans
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Histórico Escolar e Ementas
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Regulamento Disciplinar Discente (CPS)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Calendário Letivo Homologado
              </li>
            </ul>
          </div>

          {/* Col 3: Portais Parceiros */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Portais e Sistemas
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <a 
                  href="https://www.cps.sp.gov.br" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal Centro Paula Souza</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.vestibulinhoetec.com.br" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Vestibulinho ETEC</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nsa.cps.sp.gov.br" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Sistema NSA (Notas e Faltas)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sptrans.com.br" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>DNE / SPTrans Estudante</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Suporte e Segurança */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Segurança & Verificação
            </h4>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Documentos com Fé Pública</span>
              </div>
              <p className="text-slate-400 leading-tight">
                Em conformidade com a MP 2.200-2/2001 e normas de certificação digital do Governo de São Paulo.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Dúvidas técnicas: suporte.sistemas@etec.sp.gov.br
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#141E33] border-t border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Centro Estadual de Educação Tecnológica Paula Souza - Governo do Estado de São Paulo. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 cursor-pointer">Termos de Uso</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Privacidade (LGPD)</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Ouvidoria Geral</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
