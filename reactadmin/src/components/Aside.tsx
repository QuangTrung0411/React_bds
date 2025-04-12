import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion";
import { Link, useLocation } from "react-router-dom";
import '../assets/scss/Accordion.scss';
import '../assets/scss/Aside.scss';
import { FaHome, FaUser, FaCube } from "react-icons/fa";
import { sidebarItem } from "../constant/sidebar";

const Aside = () => {
    const location = useLocation();
    const segment = location.pathname.split('/')[1];

    // Hàm tính giá trị mở cho từng section dựa trên URL
    const getOpenAccordionValueForSection = (section: { items: { active: string[] }[] }) => {
        for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
            const item = section.items[itemIndex];
            if (item.active.includes(segment)) {
                return `item-${itemIndex}`;
            }
        }
    };

    return (
        <aside className="app-aside w-60 bg-[#111c43] h-full fixed top-0">
            <div className="main-sidebar-header w-60 p-3.5 z-10 fixed h-14 text-center border-solid border-red-500 border-2">
                <a href="" className="inline-block">
                    <img
                        className="h-8"
                        src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Dash_logo_2018_rgb_for_screens.png"
                        alt=""
                    />
                </a>
            </div>

            <div className="main-sidebar mt-14">
                {sidebarItem.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <div className="menu-catrgory px-6 py-3 text-[#a3aed1] text-10px tracking-wider font-semibold opacity-50">
                            {section.lable}
                        </div>
                        <Accordion
                            className="px-3 sidebar-accordion"
                            type="single"
                            collapsible
                            defaultValue={getOpenAccordionValueForSection(section)}
                        >
                            {section.items.map((group, itemIndex) => (
                                <AccordionItem key={itemIndex} value={`item-${itemIndex}`}>
                                    <AccordionTrigger
                                        className={`text-[#a3aed1] rounded-lg ${group.active.includes(segment) ? 'bg-menu-active' : ''
                                            }`}
                                    >
                                        <div className={`menu-lable flex flex-1 items-center ${group.active.includes(segment) ? 'text-white' : 'text-[#a3aed1]'
                                            }`}>
                                            {group.icon}
                                            <span>{group.label}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="boder-0 mt-2">
                                        <ul>
                                            {group.links.map((link, linkIndex) => (
                                                <li key={linkIndex} className="pl-6">
                                                    <Link
                                                        className="side-menu__item block text-[#a3aed1] text-13px relative hover:text-white hover:bg-menu-active"
                                                        to={link.to}
                                                    >
                                                        {link.title}
                                                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2
                                                            w-1 h-1 border-2 rounded-full bg-white"></span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Aside;
