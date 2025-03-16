import { createContext, useState, useContext, ReactNode } from "react";

interface ToastContextType {
    message: string;
    type:'success' | 'error' | 'warning' | null;
    setMessage: (message: string,type?: 'success' | 'error' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [message, setMessage] = useState<string>("");
    return (
        <ToastContext.Provider value={{ message, setMessage }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("có vấn đề xảy ra");
    }
    return context;
}
