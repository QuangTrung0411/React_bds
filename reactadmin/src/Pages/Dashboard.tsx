import PageHeading from "../components/Heading";


const Dashboard = () => {
    const breadcrumb = {
        title: "Thống kê chung",
        route: "/dashboard",
    }

    return (
        <>
        <PageHeading breadcrumb={breadcrumb}/>
        </>
    );
}
export default Dashboard;
