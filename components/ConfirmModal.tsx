import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-space-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-space-500/30 animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isDestructive ? 'bg-gold-500/10 text-gold-500' : 'bg-electric-500/10 text-electric-400'}`}>
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-ink">{title}</h3>
            </div>
            <button
              onClick={onCancel}
              aria-label="Close dialog"
              className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-space-600/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsa-blue/60"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-ink-dim whitespace-pre-wrap">{message}</p>
        </div>
        <div className="bg-space-700/40 px-6 py-4 flex justify-end gap-3 border-t border-space-500/30">
          <button
            onClick={onCancel}
            className="px-4 py-2 min-h-[40px] text-sm font-medium text-ink-muted hover:text-ink hover:bg-space-700/60 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsa-blue/60"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className={`px-4 py-2 min-h-[40px] text-sm font-medium text-white rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
              isDestructive
                ? 'bg-gold-500 hover:bg-gold-600 focus-visible:ring-gold-500/60'
                : 'bg-electric-500 hover:bg-electric-600 focus-visible:ring-electric-500/60'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
