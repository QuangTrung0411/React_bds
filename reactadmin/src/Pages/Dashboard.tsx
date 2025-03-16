import { useToast } from "../contexts/ToastContext";
import { toast } from "react-toastify";
import { useEffect } from "react";


const Dashboard = () => {
    const { message, setMessage } = useToast();
    useEffect(() => {
        console.log(message);
        if (message) {
            toast.success(message);
            setMessage("");
        }
        }, []);
    return (
        <div>dashboard</div>
    );
}
export default Dashboard;
