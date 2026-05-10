import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

interface ModalContextType {
  confirm: (title: string, message: string, isDestructive?: boolean, confirmText?: string) => Promise<boolean>;
  alert: (title: string, message: string) => Promise<void>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'confirm' | 'alert';
    title: string;
    message: string;
    isDestructive: boolean;
    confirmText: string;
    resolve: ((value: boolean | void) => void) | null;
  }>({
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
    isDestructive: false,
    confirmText: 'OK',
    resolve: null,
  });

  const confirm = (title: string, message: string, isDestructive = false, confirmText = 'Confirm'): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        type: 'confirm',
        title,
        message,
        isDestructive,
        confirmText,
        resolve: resolve as (value: boolean | void) => void,
      });
    });
  };

  const alert = (title: string, message: string): Promise<void> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        type: 'alert',
        title,
        message,
        isDestructive: false,
        confirmText: 'OK',
        resolve: resolve as (value: boolean | void) => void,
      });
    });
  };

  const handleClose = (result: boolean) => {
    if (modalState.resolve) {
      if (modalState.type === 'confirm') {
        modalState.resolve(result);
      } else {
        modalState.resolve();
      }
    }
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ confirm, alert }}>
      {children}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-space-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-space-500/30 animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${modalState.type === 'confirm' && modalState.isDestructive ? 'bg-gold-500/10 text-gold-500' : 'bg-electric-500/10 text-electric-400'}`}>
                    {modalState.type === 'confirm' && modalState.isDestructive ? <AlertTriangle size={24} /> : <Info size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-ink">{modalState.title}</h3>
                </div>
                <button onClick={() => handleClose(false)} className="text-ink-muted hover:text-ink transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-ink-dim whitespace-pre-wrap">{modalState.message}</p>
            </div>
            <div className="bg-space-700/40 px-6 py-4 flex justify-end gap-3 border-t border-space-500/30">
              {modalState.type === 'confirm' && (
                <button
                  onClick={() => handleClose(false)}
                  className="px-4 py-2 text-sm font-medium text-ink-muted hover:bg-space-700/60 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => handleClose(true)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  modalState.type === 'confirm' && modalState.isDestructive
                    ? 'bg-gold-500 hover:bg-gold-600'
                    : 'bg-electric-500 hover:bg-electric-600'
                }`}
              >
                {modalState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
