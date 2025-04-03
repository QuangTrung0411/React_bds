import { Link } from "react-router-dom";
import PageHeading from "../../../components/Heading";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Checkbox } from "../../../components/ui/checkbox";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { pagination } from "../../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../../../components/ui/loading";

const User = () => {

    const breadcrumb = {
        title: "Quản Lý Thành viên",
        route: "/user/index",
    }

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: pagination
    });

    console.log(data)

    return (
        <>
            <PageHeading breadcrumb={breadcrumb} />
            <div className="container">
                <Card className="rounded-[5px] mt-[15px] border-none bg-white">
                    <CardHeader className="border-b border-solid border-[#b6b4b4ad] p-[20px]" >
                        <CardTitle className="uppercase">Quản lý danh sách thành viên</CardTitle>
                        <CardDescription className="text-xs text-[#f00000]">Hiển thị danh sách thành viên,sử dụng các chức năng bên dưới để lọc theo ý muốn </CardDescription>
                    </CardHeader>
                    <CardContent className="p-[15px]">
                        <Table className="border border-solid border-[#f3f3f3]">
                            {/* <TableCaption>Danh sách thành viên.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Checkbox className="text-white" />
                                    </TableHead>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Họ tên</TableHead>
                                    <TableHead>Số điện thoại</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Địa chỉ</TableHead>
                                    <TableHead>nhóm thành viên</TableHead>
                                    <TableHead>Tình trạng</TableHead>
                                    <TableHead>Tác vụ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell aria-colspan={9} className="text-center items-center">
                                            <LoadingSpinner className="inline-block mr-[5px]" />
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : isError ? (
                                    <TableRow>
                                        <TableCell aria-colspan={9} className="text-center text-[12px] text-[#f00000]">
                                            có vấn đề xảy ra trong quá trình truy suất dữ liệu.Hãy thử lại sau
                                        </TableCell>
                                    </TableRow>
                                ) : data?.user?.map((user: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            <Checkbox className="text-white" />
                                        </TableCell>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.group}</TableCell>
                                        <TableCell>
                                            <Switch />
                                        </TableCell>
                                        <TableCell className="flex">
                                            <Button className="flex mr-[5px]">
                                                <Link to={`/user/update/${user.id}`} className="text-white">
                                                    <FaRegEdit />
                                                </Link>
                                            </Button>
                                            <Button className="bg-red-500 mr-[5px]">
                                                <Link to={`/user/delete/${user.id}`} className="text-white">
                                                    <MdDeleteOutline />
                                                </Link>
                                            </Button>
                                            <Button className="bg-yellow-500">
                                                <Link to={`/user/reset/${user.id}`} className="text-white">
                                                    <RiResetLeftFill />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
export default User;
