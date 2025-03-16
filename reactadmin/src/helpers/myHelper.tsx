import { toast } from "react-toastify";
import { ToastType } from "../contexts/ToastContext";
import { set } from "react-hook-form";

export const showNotify = (
    message: string,
    type: ToastType,
    setMessage: (message: string, type: ToastType) => void
) => {

    if(message) {
        switch(type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            default:
                break;
        }
        setMessage("", null);
    }

}


