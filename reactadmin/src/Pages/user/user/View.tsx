import { Link } from "react-router-dom";
import PageHeading from "../../../components/Heading";


const User = () => {

const breadcrumb = {
    title: "Quản Lý Thành viên",
    route: "/user/index",
}

    return (
        <>
        <PageHeading breadcrumb={breadcrumb}/>
        
        </>
    );
}
export default User;
