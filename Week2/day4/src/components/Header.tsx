import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { useDarkMode } from "@/hooks/useDarkMode"
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useRef, useState } from "react";
import { menuItems } from "@/types";
import { useTaskContext } from "@/context/TaskContext";

import {
    ChevronLeftIcon,
    MenuIcon,
    XIcon,
    SunIcon,
    MoonIcon,
    LogOut
} from "lucide-react"
import { useAuth } from "@/context/AuthContext";
interface SidebarProps {
    onCollapseChange?: (collapsed: boolean) => void;
}

export function Sidebar({ onCollapseChange }: SidebarProps) {
    const location = useLocation();
    const { logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const { isDark, toggleTheme } = useDarkMode();
    const {
        isMobileMenuOpen,
        closeMenu,
        toggleMenu
    } = useMobileMenu();

    const [holdTooltip, setHoldTooltip] = useState<boolean>(false);
    const holdTimeout = useRef<NodeJS.Timeout | null>(null);

    const { tasks } = useTaskContext();
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const remaining = total - completed;

    const handleToggle = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        onCollapseChange?.(newCollapsed);
    };
    const handleLogout = () => {
        logout();
        closeMenu();

    }
    React.useEffect(() => {
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, []);



    return (
        <>

            <div className="lg:hidden  fixed top-4 left-4 z-50">
                <button
                    onClick={toggleMenu}
                    className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-md hover:shadow-lg mobile-menu-btn"
                    title={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                >
                    {isMobileMenuOpen ? (
                        <XIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    ) : (
                        <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    )}
                </button>
            </div>
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 mobile-overlay"
                    onClick={closeMenu}
                />
            )}


            <div className={`${isMobileMenuOpen ? 'translate-x-0 ' : ' -translate-x-full'
                } lg:translate-x-0 ${isCollapsed ? 'w-16' : 'w-64'}  overflow-hidden h-screen fixed lg:sticky bg-white dark:bg-black border-r border-gray-200 dark:border-gray-700 left-0 top-0 sidebar-collapse group ${isCollapsed ? 'sidebar-collapsed' : ''} z-50 lg:z-auto`}>
                <div className="flex flex-col h-full">

                    <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-gray-200 dark:border-gray-700 relative flex-shrink-0`}>
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                            {!isCollapsed && (
                                <>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Todo App
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Quản lý công việc hiệu quả
                                    </p>
                                </>
                            )}
                            {isCollapsed && (
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    <img
                                        src="https://anibase.net/files/0b8de43b06bd6ce8b31c711c0f2be3ea"
                                        className="w-10 h-10 rounded-full"
                                        alt="Logo"
                                    />


                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleToggle}
                            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-md hover:shadow-lg btn-hover ${isCollapsed ? 'rotate-180' : ''
                                }`}
                            title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                        >
                            <ChevronLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    <nav className={`${isCollapsed ? 'p-2 overflow-hidden' : 'p-4'} flex-1 overflow-hidden`}>
                        <ul className="space-y-1">

                            <li className="lg:hidden mb-4">
                                <button
                                    onClick={closeMenu}
                                    className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                >
                                    <XIcon className="w-5 h-5 mr-2" />
                                    <span>Đóng menu</span>
                                </button>
                            </li>
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.to;


                                const handleMouseDown = () => {
                                    if (isCollapsed) {
                                        holdTimeout.current = setTimeout(() => {
                                            setHoldTooltip(true);

                                        }, 400);
                                    }
                                    console.log("Hold tooltip for", isCollapsed);
                                };
                                const handleMouseUp = () => {
                                    if (holdTimeout.current) clearTimeout(holdTimeout.current);
                                    setHoldTooltip(false);
                                };
                                const handleMouseLeave = () => {
                                    if (holdTimeout.current) clearTimeout(holdTimeout.current);
                                    setHoldTooltip(false);
                                };

                                return (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2 py-2' : 'px-4 py-3'} rounded-lg sidebar-item group relative ${isActive
                                                ? "bg-white/35 dark:bg-white/20 text-white dark:text-white border-r-2 border-gray-300"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                                }`}
                                            title={isCollapsed ? item.title : undefined}
                                            onMouseDown={handleMouseDown}
                                            onMouseUp={handleMouseUp}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} sidebar-icon ${isActive
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                                }`} />
                                            {!isCollapsed && (
                                                <div className="flex-1">
                                                    <div className="font-medium">{item.title}</div>
                                                    {
                                                        holdTooltip && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {item.description}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )}

                                            {isCollapsed && (
                                                <div className={`absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded z-50 pointer-events-none whitespace-nowrap transition-opacity duration-200
                                                 opacity-0 group-hover:opacity-100`}
                                                >
                                                    <div className="font-medium">{item.title}</div>
                                                    {
                                                        holdTooltip && (
                                                            <div className="text-xs text-gray-300 dark:text-gray-200 mt-1">
                                                                {item.description}
                                                            </div>
                                                        )
                                                    }
                                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                                                </div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto flex-shrink-0">
                            <button
                                onClick={toggleTheme}
                                className={` `}
                                title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                            >
                                {isDark ? (
                                    <div className="flex items-center gap-2">
                                        {
                                            !isCollapsed && (<span className="text-white"> Light</span>)
                                        }
                                        <SunIcon className="w-4 h-4 text-yellow-500" />

                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {
                                            !isCollapsed && (<span className="text-white"> Dark</span>)
                                        }

                                        <MoonIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />

                                    </div>

                                )}
                            </button>
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto flex-shrink-0">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                {
                                    isCollapsed ? (
                                        <div className="flex items-center gap-">
                                            <LogOut className="w-5 h-5" />

                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </div>
                                    )
                                }
                            </button>
                        </div>
                    </nav>
                    {!isCollapsed && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto flex-shrink-0">
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                    Thống kê hôm nay
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Tổng công việc</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Đã hoàn thành</span>
                                        <span className="font-medium text-green-600">{completed}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Còn lại</span>
                                        <span className="font-medium text-orange-600">{remaining}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {isCollapsed && (
                        <div className="p-2 border-t border-gray-200 dark:border-gray-700 mt-auto flex-shrink-0">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 flex justify-center">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">{total}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
