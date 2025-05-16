import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />
        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-700 overflow-y-auto mt-[30px] ml-[250px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;