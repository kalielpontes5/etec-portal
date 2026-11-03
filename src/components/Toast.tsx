import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-200 bg-white text-slate-800';
        let iconClass = 'text-emerald-600 bg-emerald-50';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-red-200 bg-white text-slate-800';
          iconClass = 'text-red-600 bg-red-50';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-blue-200 bg-white text-slate-800';
          iconClass = 'text-blue-600 bg-blue-50';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-start gap-3 transition-all animate-in slide-in-from-bottom-5 duration-200 ${borderClass}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-900">{toast.title}</p>
              {toast.description && (
                <p className="text-slate-600 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
