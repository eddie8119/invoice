import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';

interface ModalContextType {
  registerModal: (id: string, closeModal: () => void) => void;
  unregisterModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, () => void>>({});
  const pathname = usePathname();

  // Register a modal with its close function
  const registerModal = (id: string, closeModal: () => void) => {
    setModals(prev => ({ ...prev, [id]: closeModal }));
  };

  // Unregister a modal when it's unmounted
  const unregisterModal = (id: string) => {
    setModals(prev => {
      const newModals = { ...prev };
      delete newModals[id];
      return newModals;
    });
  };

  // Close all registered modals
  const closeAllModals = () => {
    Object.values(modals).forEach(closeModal => closeModal());
  };

  // Close all modals when the route changes
  useEffect(() => {
    closeAllModals();
  }, [pathname]);

  return (
    <ModalContext.Provider value={{ registerModal, unregisterModal, closeAllModals }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for modal components
export const useModalAutoClose = (isVisible: boolean, onClose: () => void, id: string) => {
  const { registerModal, unregisterModal } = useModalContext();

  useEffect(() => {
    if (isVisible) {
      registerModal(id, onClose);
      return () => unregisterModal(id);
    }
  }, [isVisible, onClose, id, registerModal, unregisterModal]);
};
