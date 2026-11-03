/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { NewRequestView } from './components/NewRequestView';
import { RequestsListView } from './components/RequestsListView';
import { RequestDetailModal } from './components/RequestDetailModal';
import { OfficialDocumentModal } from './components/OfficialDocumentModal';
import { FaqView } from './components/FaqView';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CURRENT_STUDENT, INITIAL_REQUESTS } from './data/mockData';
import { RequestItem, ToastMessage } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'new-request' | 'requests-list' | 'faq'>('dashboard');
  
  // Persistent requests in localStorage
  const [requests, setRequests] = useState<RequestItem[]>(() => {
    try {
      const saved = localStorage.getItem('etec_student_requests_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved requests from localStorage', e);
    }
    return INITIAL_REQUESTS;
  });

  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState<RequestItem | null>(null);
  const [documentModalRequest, setDocumentModalRequest] = useState<RequestItem | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('etec_student_requests_v1', JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests to localStorage', e);
    }
  }, [requests]);

  const addToast = (type: ToastMessage['type'], title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, description };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const handleOpenNewRequest = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentTab('new-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitSuccess = (newRequest: RequestItem) => {
    setRequests((prev) => [newRequest, ...prev]);
    setCurrentTab('requests-list');
    addToast(
      'success',
      'Protocolo Aberto com Sucesso!',
      `Seu pedido foi registrado sob o número ${newRequest.id}. Acompanhe o status nesta tela.`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const now = new Date();
          return {
            ...req,
            status: 'cancelado',
            updatedAt: now.toISOString(),
            timeline: [
              ...req.timeline,
              {
                status: 'cancelado',
                title: 'Solicitação Cancelada pelo Aluno',
                date: `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
                description: 'O chamado foi encerrado a pedido do estudante.',
                responsible: 'Aluno'
              }
            ]
          };
        }
        return req;
      })
    );

    addToast('info', 'Solicitação Cancelada', `O protocolo ${requestId} foi cancelado com êxito.`);
  };

  const handleViewDetail = (request: RequestItem) => {
    // Look up freshest state of the request
    const fresh = requests.find((r) => r.id === request.id) || request;
    setSelectedRequestForDetail(fresh);
  };

  const handleOpenQuickDocument = () => {
    // Find the completed dec_matricula or provide a default one
    const completedMatricula = requests.find(
      (r) => r.serviceId === 'dec_matricula' && r.status === 'concluido'
    );
    setDocumentModalRequest(completedMatricula || requests[0] || null);
    setShowDocumentModal(true);
  };

  const handleDownloadFromRequest = (request: RequestItem) => {
    setDocumentModalRequest(request);
    setShowDocumentModal(true);
  };

  const handleDocumentDownloaded = () => {
    addToast(
      'success',
      'Declaração Emitida com Sucesso',
      'O documento autenticado está pronto para impressão ou arquivamento.'
    );
  };

  const activeRequestsCount = requests.filter(
    (r) => r.status === 'em_analise' || r.status === 'em_processamento' || r.status === 'pronto_retirada'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] text-[#1D2A44] font-sans antialiased">
      {/* Header with Official ETEC & CPS Logos and Responsive Nav */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        student={CURRENT_STUDENT}
        activeRequestsCount={activeRequestsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            student={CURRENT_STUDENT}
            requests={requests}
            onOpenNewRequest={handleOpenNewRequest}
            onViewRequestDetail={handleViewDetail}
            onOpenQuickDocument={handleOpenQuickDocument}
            onNavigateToTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'new-request' && (
          <NewRequestView
            student={CURRENT_STUDENT}
            preselectedServiceId={preselectedServiceId}
            onSubmitSuccess={handleSubmitSuccess}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'requests-list' && (
          <RequestsListView
            requests={requests}
            onViewDetail={handleViewDetail}
            onOpenNewRequest={() => handleOpenNewRequest()}
            onCancelRequest={handleCancelRequest}
            onDownloadDocument={handleDownloadFromRequest}
          />
        )}

        {currentTab === 'faq' && (
          <FaqView
            student={CURRENT_STUDENT}
            onOpenNewRequest={() => handleOpenNewRequest()}
          />
        )}
      </main>

      {/* Detailed Request Modal */}
      <RequestDetailModal
        request={selectedRequestForDetail}
        onClose={() => setSelectedRequestForDetail(null)}
        onCancelRequest={handleCancelRequest}
        onDownloadDocument={handleDownloadFromRequest}
      />

      {/* Official Certificate Viewer Modal */}
      {showDocumentModal && (
        <OfficialDocumentModal
          student={CURRENT_STUDENT}
          request={documentModalRequest}
          onClose={() => setShowDocumentModal(false)}
          onDownloaded={handleDocumentDownloaded}
        />
      )}

      {/* Floating Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Official Institutional Footer */}
      <Footer />
    </div>
  );
}
