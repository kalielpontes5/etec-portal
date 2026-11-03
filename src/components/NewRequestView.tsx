import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  File, 
  Send, 
  ArrowLeft,
  Building,
  Laptop,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ServiceType, AttachmentFile, RequestItem, DeliveryMode, Student } from '../types';
import { AVAILABLE_SERVICES } from '../data/mockData';

interface NewRequestViewProps {
  student: Student;
  preselectedServiceId?: string;
  onSubmitSuccess: (newRequest: RequestItem) => void;
  onCancel: () => void;
}

export const NewRequestView: React.FC<NewRequestViewProps> = ({
  student,
  preselectedServiceId,
  onSubmitSuccess,
  onCancel
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || AVAILABLE_SERVICES[0].id
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('digital');
  const [notes, setNotes] = useState<string>('');
  const [studentContactPhone, setStudentContactPhone] = useState<string>(student.phone);
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update selected service when preselectedServiceId changes
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      const found = AVAILABLE_SERVICES.find(s => s.id === preselectedServiceId);
      if (found && !found.deliveryOptions.includes('digital') && found.deliveryOptions.includes('presencial')) {
        setDeliveryMode('presencial');
      }
    }
  }, [preselectedServiceId]);

  const currentService = AVAILABLE_SERVICES.find(s => s.id === selectedServiceId) || AVAILABLE_SERVICES[0];

  // Adjust delivery mode if selected service doesn't support current mode
  useEffect(() => {
    if (!currentService.deliveryOptions.includes(deliveryMode)) {
      setDeliveryMode(currentService.deliveryOptions[0]);
    }
  }, [currentService, deliveryMode]);

  const filteredServices = AVAILABLE_SERVICES.filter(service => {
    if (categoryFilter === 'todos') return true;
    return service.category === categoryFilter;
  });

  // Handle simulated file additions
  const handleSimulatedFileUpload = (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) return;
    setErrorMessage(null);

    const newFiles: AttachmentFile[] = [];
    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      // Format file size
      const sizeKB = (file.size / 1024).toFixed(1);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const formattedSize = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;

      newFiles.push({
        name: file.name,
        size: formattedSize,
        type: file.type || 'application/octet-stream'
      });
    }

    setAttachments(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleSimulatedFileUpload(e.dataTransfer.files);
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!notes.trim() && currentService.requiresAttachment) {
      // If service requires attachment, ensure at least an attachment or notes are present
    }

    if (currentService.requiresAttachment && attachments.length === 0) {
      setErrorMessage(`O serviço "${currentService.title}" exige o anexo de documento comprobatório para prosseguir.`);
      return;
    }

    setIsSubmitting(true);

    // Generate unique Protocol ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `REQ-2026-${randomNum}`;

    const now = new Date();
    const completionDate = new Date();
    completionDate.setDate(now.getDate() + currentService.estimatedDays);

    setTimeout(() => {
      const newRequest: RequestItem = {
        id: newId,
        serviceId: currentService.id,
        serviceTitle: currentService.title,
        category: currentService.categoryLabel,
        studentId: student.id,
        studentName: student.name,
        studentRa: student.ra,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        estimatedCompletion: completionDate.toISOString().split('T')[0],
        status: 'em_analise',
        deliveryMode: deliveryMode,
        notes: notes.trim() || 'Solicitação efetuada pelo estudante através do portal oficial.',
        attachments: attachments,
        timeline: [
          {
            status: 'em_analise',
            title: 'Solicitação Protocolada',
            date: `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            description: 'Pedido inserido na fila de atendimento da Secretaria Escolar.'
          }
        ],
        pickupLocation: deliveryMode === 'presencial' ? 'Secretaria Acadêmica - Guichê 01 ou 02' : undefined,
        authCode: `CPS-${randomNum}-ETEC-AUT`,
        digitalDocumentAvailable: currentService.id === 'dec_matricula'
      };

      setIsSubmitting(false);
      onSubmitSuccess(newRequest);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Painel
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Nova Solicitação Acadêmica
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Preencha os dados abaixo para protocolar o seu pedido junto à secretaria da {student.unit}.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs">
          <span>Aluno: </span>
          <strong className="text-slate-800">{student.name}</strong>
          <span className="block text-[11px] text-slate-400">RA: {student.ra} · {student.module}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Service Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#B21E27] text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              Escolha o Serviço ou Documento
            </h3>

            {/* Category filter pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'documentos', label: 'Documentos' },
                { id: 'transporte', label: 'Transporte' },
                { id: 'matricula', label: 'Matrícula' },
                { id: 'atestados', label: 'Atestados' }
              ].map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    categoryFilter === cat.id 
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {filteredServices.map(service => {
              const isSelected = selectedServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`
                    p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between
                    ${isSelected 
                      ? 'border-[#B21E27] bg-red-50/40 ring-2 ring-[#B21E27]/20 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'}
                  `}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 line-clamp-1">
                        {service.title}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#B21E27] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Prazo: {service.estimatedDays} {service.estimatedDays === 1 ? 'dia útil' : 'dias úteis'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {service.requiresAttachment ? 'Requer anexo' : 'Sem anexo'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current selected service highlight note */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#002F6C] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Serviço Selecionado: </span>
              <strong>{currentService.title}</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentService.description}
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Delivery Mode */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#B21E27] text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            Modalidade de Entrega
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentService.deliveryOptions.includes('digital') && (
              <label 
                className={`
                  flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all
                  ${deliveryMode === 'digital' 
                    ? 'border-[#002F6C] bg-blue-50/40 ring-2 ring-[#002F6C]/20' 
                    : 'border-slate-200 hover:border-slate-300'}
                `}
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  value="digital"
                  checked={deliveryMode === 'digital'}
                  onChange={() => setDeliveryMode('digital')}
                  className="mt-1 text-[#002F6C] focus:ring-[#002F6C]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-[#002F6C]" />
                    <span className="text-xs font-bold text-slate-900">
                      Digital / Online (PDF Autenticado)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Disponibilizado para download neste portal com assinatura eletrônica e validação por QR Code. Não requer deslocamento.
                  </p>
                </div>
              </label>
            )}

            {currentService.deliveryOptions.includes('presencial') && (
              <label 
                className={`
                  flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all
                  ${deliveryMode === 'presencial' 
                    ? 'border-[#002F6C] bg-blue-50/40 ring-2 ring-[#002F6C]/20' 
                    : 'border-slate-200 hover:border-slate-300'}
                `}
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  value="presencial"
                  checked={deliveryMode === 'presencial'}
                  onChange={() => setDeliveryMode('presencial')}
                  className="mt-1 text-[#002F6C] focus:ring-[#002F6C]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#002F6C]" />
                    <span className="text-xs font-bold text-slate-900">
                      Retirada Presencial no Balcão
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Documento físico impresso e carimbado na Secretaria da ETEC (Guichê de atendimento aos estudantes).
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Step 3: Observations & Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#B21E27] text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            Observações e Justificativa do Pedido
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Descreva a finalidade ou observação complementar
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Documento para comprovação de estágio remunerado, requerimento de passe livre EMTU linha intermunicipal, etc."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#B21E27] focus:ring-2 focus:ring-[#B21E27]/20 placeholder:text-slate-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Informe detalhes adicionais que auxiliem a secretaria a processar sua solicitação com maior agilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Telefone / WhatsApp de Contato
              </label>
              <input
                type="text"
                value={studentContactPhone}
                onChange={(e) => setStudentContactPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#B21E27]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                E-mail Institucional
              </label>
              <input
                type="text"
                disabled
                value={student.email}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Attachment Upload Area */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#B21E27] text-white flex items-center justify-center text-xs font-bold">
                4
              </span>
              Anexos e Documentos Comprobatórios
              {currentService.requiresAttachment ? (
                <span className="text-[10px] uppercase font-bold text-[#B21E27] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Obrigatório
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-normal">
                  (Opcional)
                </span>
              )}
            </h3>
          </div>

          {currentService.attachmentInstructions && (
            <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{currentService.attachmentInstructions}</span>
            </div>
          )}

          {/* Drag & Drop Upload Container */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
              ${isDragging 
                ? 'border-[#B21E27] bg-red-50/30' 
                : 'border-slate-200 hover:border-slate-400 bg-slate-50/50'}
            `}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleSimulatedFileUpload(e.target.files)}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer block space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#B21E27] flex items-center justify-center mx-auto shadow-2xs">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Clique para selecionar ou arraste arquivos aqui
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Formatos aceitos: PDF, JPG, PNG até 10MB por arquivo
                </p>
              </div>
            </label>
          </div>

          {/* Attachments List */}
          {attachments.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Arquivos anexados ({attachments.length}):
              </span>
              <div className="space-y-1.5">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <File className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">
                        {file.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({file.size})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-200 transition-colors"
                      title="Remover anexo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Previsão de conclusão estimada: <strong>{currentService.estimatedDays} dias úteis</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-6 py-2.5 text-xs font-bold rounded-lg bg-[#B21E27] text-white hover:bg-[#8C141C] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Protocolando Chamado...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirmar e Protocolar Pedido</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
