import { FaHome, FaUser } from 'react-icons/fa';

export const sidebarItem = [
    {
        lable: 'MAIN',
        items: [
            {
                icon: <FaHome className="text-sm mr-2" />,
                active: ['dashboard'],
                label: 'dashboard',
                links: [
                    {title: 'Thống kê chung',to: '/dashboard'},
                    {title: 'Thống kê đơn hàng',to: '/dashboard/order'},
                ]
            }
        ]
    },
    {
        lable: 'FUNCTION',
        items: [
            {
                icon: <FaUser className="text-sm mr-2" />,
                active: ['user'],
                label: 'QL Thành Viên',
                links: [
                    {title: 'QL Nhóm Thành Viên',to: '/user/catalogue/index'},
                    {title: 'QL Thành Viên',to: '/user/index'},
                ]
            }
        ]
    }
];