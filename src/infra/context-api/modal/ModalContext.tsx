import React, { createContext, useContext, useState } from 'react';

interface ModalContextProps {
    currentModal: string | null;
    openModal: (modal: string) => void;
    closeModal: () => void;
    isModalOpen: (modal: string) => boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentModal, setCurrentModal] = useState<string | null>(null);

    const openModal = (modal: string) => {
        setCurrentModal(modal); // Garantir que só um modal esteja aberto por vez
    };

    const closeModal = () => {
        setCurrentModal(null); // Fechar o modal
    };

    const isModalOpen = (modal: string) => currentModal === modal; // Verifica se o modal está aberto

    return (
        <ModalContext.Provider value={{ currentModal, openModal, closeModal, isModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};
