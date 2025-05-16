import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const menuItems = [
    { name: "Pomodoro", path: "/" },
    { name: "Movies", path: "/movie" },
    { name: "Person", path: "/person" }
  ];

  return (
    <aside className="fixed top-[50px] w-[250px] h-screen bg-gray-800 text-white flex flex-col z-10">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Side Bar</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y- p-4">
          {menuItems.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="whitespace-nowrap">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
