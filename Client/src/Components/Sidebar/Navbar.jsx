import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image imports
import user from "../../Assets/profile.png";
import logo from "../../Assets/logo.png";

// Icon imports
import { BiLogOut, BiLayout, BiHeart } from "react-icons/bi";
import { TbLayoutGridAdd, TbCube, TbMessages, TbUsers } from "react-icons/tb";
import { LuCircleDot, LuFile, LuLayoutGrid } from "react-icons/lu";
import { PiBasket, PiShootingStarLight, PiLightbulbThin } from "react-icons/pi";
import { HiOutlineHome } from "react-icons/hi";
import { CiShoppingBasket } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { GoChevronDown, GoMail } from "react-icons/go";
import { LiaFlagUsaSolid } from "react-icons/lia";

// CSS imports
import "./Navbar.css";
import Menu from "../Menu/Menu";

const Navbar = ({ children }) => {
  //Sidebar toggle state
  const [toggle, setToggle] = useState(true);
  const menuData = [
    { icon: <HiOutlineHome />, title: "Dashboards" },
    { icon: <TbLayoutGridAdd />, title: "Widgets" },
    { icon: <BiLayout />, title: "Page Layout" },
    { icon: <LuCircleDot />, title: "Project" },
    { icon: <LuFile />, title: "File Manager" },
    { icon: <TbCube />, title: "Kanban Board" },
    { icon: <PiBasket />, title: "E-commerce" },
    { icon: <GoMail />, title: "Letterbox" },
    { icon: <TbMessages />, title: "Chat" },
    { icon: <TbUsers />, title: "Users" },
    { icon: <BiHeart />, title: "Bookmarks" },
    { icon: <BiLogOut />, title: "Logout" },
  ];

  return (
    <>
      {/* Side Bar */}
      <div id="sidebar" className={toggle ? "hide" : ""}>
        {/* Side bar logo */}
        <Link href="/" className="logo">
          <div className="logoBox">
            <img src={logo} alt="logo" />
            <LuLayoutGrid
              className="menuIconHidden"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </Link>

        {/* Side bar menu */}
        <ul className="side-menu top">
          {menuData?.map((data, i) => {
            return <Menu Icon={data.icon} Title={data.title} key={i} />;
          })}
        </ul>
      </div>

      {/* Top Bar */}
      <div id="content">
        <nav>
          <div>
            <LuLayoutGrid
              className="menuIcon"
              onClick={() => setToggle(!toggle)}
            />
            <Link href="/" className="nav-link">
              🔥 Something you love is now on sale ! <span>Buy now !</span>
            </Link>
          </div>
          <div>
            <Link href="/" className="lang">
              <LiaFlagUsaSolid /> EN
            </Link>
            <Link href="/" className="navIcon">
              <CiSearch />
            </Link>
            <Link href="/" className="navIcon">
              <PiShootingStarLight />
            </Link>
            <Link href="/" className="navIcon">
              <PiLightbulbThin />
            </Link>
            <Link href="/" className="cart">
              <CiShoppingBasket />
              <span className="numCart number">2</span>
            </Link>
            <Link href="/" className="notification">
              <BsBell />
              <span className="num number">4</span>
            </Link>
            <Link href="/" className="profile">
              <img src={user} />
              <div>
                <p>Emay Walter</p>
                <p>
                  Admin <GoChevronDown />
                </p>
              </div>
            </Link>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};

export default Navbar;
