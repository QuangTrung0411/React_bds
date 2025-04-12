import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";


interface PageHeadingProps {
    breadcrumb:{
        title: string;
        route: string;
    };
}
import { Link } from "react-router-dom";

const PageHeading: React.FC<PageHeadingProps> = ({breadcrumb}) => {
    return (
        <>
            <div className="page-heading py-[20px] bg-white">
                <div className="px-[10px]">
                <h2 className="text-[24px] mb-[5px]">{breadcrumb.title}</h2>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to="/dashboard" className="text-[#999] hover:text-[#333]">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link className="text-[#999] hover:text-[#333]" to={breadcrumb.route}>{breadcrumb.title}</Link>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                </div>
            </div>

        </>
    )
}
export default PageHeading;