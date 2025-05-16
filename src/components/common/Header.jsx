import React from "react";
import { Link } from "react-router-dom";
import sslogo from "../../assets/images/sslogo.png"

const Header = () => {
  return (
    <header className="bg-black text-white fixed top-0 w-full z-50">
      <div className="px-[30px] py-[10px] flex justify-between items-center">
        {/* Logo */}
        <Link
          className="text-2xl font-semibold hover:opacity-80 transition-opacity duration-200"
        >
          <img src={sslogo} alt="logo" className="w-auto h-8" />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-[20px] text-sm font-medium">
            <li>
              <Link
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Menu 1
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Menu 2
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Menu 3
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Menu 4
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;