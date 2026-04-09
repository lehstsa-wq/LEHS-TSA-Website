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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-dark-surface rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-dark-border animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${modalState.type === 'confirm' && modalState.isDestructive ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/20'}`}>
                    {modalState.type === 'confirm' && modalState.isDestructive ? <AlertTriangle size={24} /> : <Info size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{modalState.title}</h3>
                </div>
                <button onClick={() => handleClose(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{modalState.message}</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 px-6 py-4 flex justify-end gap-3 border-t border-gray-100 dark:border-white/5">
              {modalState.type === 'confirm' && (
                <button
                  onClick={() => handleClose(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => handleClose(true)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  modalState.type === 'confirm' && modalState.isDestructive 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-accent-blue hover:bg-blue-700'
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
