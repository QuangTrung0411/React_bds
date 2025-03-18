import { toast } from "react-toastify";
import { ToastType } from "../contexts/ToastContext";

export const showNotify = (
    message: string, // nội dung thông báo
    type: ToastType, // loại thông báo
    setMessage: (message: string, type: ToastType) => void // hàm để xóa thông báo
) => {

    if (message) {
        switch (type) {
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

// Hiển thị thông báo mà không xóa nó
export const showToast = (
    message: string, // nội dung thông báo
    type: ToastType, // loại thông báo
    setMessage?: (message: string, type: ToastType) => void // hàm tùy chọn để xóa thông báo
) => {

    if (message) {
        switch (type) {
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
    }

}
