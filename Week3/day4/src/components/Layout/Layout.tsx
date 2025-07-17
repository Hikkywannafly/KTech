import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Header";
import { TaskProvider } from "@/context/TaskContext";

const Layout: FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <TaskProvider>
      <div className="flex h-screen  dark:bg-gray-200">
        <Sidebar onCollapseChange={setSidebarCollapsed} />
        <main className={`flex-1 transition-all duration-300 ease-in-out lg:${sidebarCollapsed ? 'ml-16' : 'ml-64'} p-4 lg:p-6 overflow-y-auto`}>
          <Outlet />
        </main>
      </div>
    </TaskProvider>
  );
};

export default Layout;
