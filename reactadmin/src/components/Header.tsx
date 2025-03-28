import { FaBars } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FaCog } from "react-icons/fa";




const Header = () => {
  return (
    <header className="app-header h-14 fixed w-full content-center items-center top-0 bg-white">
      <div className="main-header mx-auto px-15px h-full flex items-center justify-between">
        <FaBars className="text-30px cursor-pointer" />
        <div className="header-right-content flex justify-end items-center">
          <div className="header-search">
            <IoSearch className=" cursor pointer text-xl " />
          </div>
          <div className="card-dropdown">
            <Link to="/" className="header-link flex relative">
              <FiShoppingCart className="cursor pointer header-link-icon" />
              <span className="badge absolute top-[2px] right-[2px] text-[10px] text-white font-semibold w-[14px] h-[15px] text-center rounded-full bg-primary">5</span>
            </Link>
          </div>
          <div className="notification-dropdown">
            <Link to="/" className="header-link flex relative">
              <IoMdNotificationsOutline className="cursor pointer header-link-icon" />
              <span className="badge absolute top-[2px] right-[2px] text-[10px] text-white font-semibold w-[14px] h-[15px] text-center rounded-full bg-second">5</span>
            </Link>
          </div>
          <div className="shortcut-dropdown">
            <Link to="/" className="header-link flex">
              <IoGridOutline className="cursor pointer header-link-icon" />
              <span className="badge">5</span>
            </Link>
          </div>
          <div className="fullscreen">
            <Link to="/" className="header-link flex">
              <MdFullscreen className="cursor pointer header-link-icon" />
              <span className="badge">5</span>
            </Link>
          </div>
          <div className="profile">
            <DropdownMenu >
              <DropdownMenuTrigger className="flex items-center cursor-pointer">
                <Avatar className="mr-3">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="profile-content text-left">
                  <div className="font-semibold">Sờ Rất Âu</div>
                  <div className="role text-xs text-[#536485]">Admin</div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>Cài đặt tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-[#333335] cursor-pointer">
                  <CgProfile className="mr-2 text-[18px]" />
                  Thay đổi thông tin
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center text-[#333335] cursor-pointer">
                  <IoExitOutline className="mr-2 text-[18px]" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="header-setting">
            <div className="header-link flex">
              <FaCog className="cursor pointer header-link-icon animate-spin spin-slow " />
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-gray-300 h-0.5 border-0" />

    </header>
  );
}

export default Header;