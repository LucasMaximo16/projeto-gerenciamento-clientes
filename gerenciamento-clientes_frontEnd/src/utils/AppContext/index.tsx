// AppContext.tsx
import{ createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <AppContext.Provider value= {{ isModalOpen, openModal, closeModal }}>
            { children }
        </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};
