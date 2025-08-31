import { ModalProvider as ModalContextProvider } from '@/context/ModalContext';
import React from 'react';

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ModalContextProvider>{children}</ModalContextProvider>;
};
