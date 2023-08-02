import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image imports
import user from "../../Assets/profile.png";
import logo from "../../Assets/logo.png";

// Icon imports
import { BiLogOut, BiHeart, BiUserVoice } from "react-icons/bi";
import {
  TbLayoutGridAdd,
  TbMessages,
  TbUsers,
  TbBrandSpeedtest,
} from "react-icons/tb";
import { LuLayoutGrid } from "react-icons/lu";
import { PiStudentDuotone } from "react-icons/pi";
import { HiOutlineHome } from "react-icons/hi";
import { BsBell, BsBookmarkCheck } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { AiOutlineQuestion } from "react-icons/ai";

// CSS imports
import "./Navbar.css";
import Menu from "../Menu/Menu";
import { Dropdown } from "antd";

const Navbar = ({ children }) => {
  //Sidebar toggle state
  const [toggle, setToggle] = useState(true);

  //Sidebar menu
  const menuData = [
    { icon: <HiOutlineHome />, title: "Dashboard", address: "/home" },
    { icon: <RiAdminLine />, title: "Admins", address: "/admin" },
    { icon: <BiUserVoice />, title: "Tutors", address: "/tutor" },
    { icon: <PiStudentDuotone />, title: "Students", address: "/student" },
    { icon: <TbBrandSpeedtest />, title: "Quizzes", address: "/quizzes" },
    { icon: <TbLayoutGridAdd />, title: "Contents", address: "/contents" },
    { icon: <AiOutlineQuestion />, title: "Doubts", address: "/doubts" },
    { icon: <TbMessages />, title: "Message", address: "/messages" },
    { icon: <TbUsers />, title: "Leader Board", address: "/leaderboard" },
    { icon: <BsBookmarkCheck />, title: "Bookmarks", address: "/bookmarks" },
    {
      icon: <MdOutlineWorkspacePremium />,
      title: "Premium",
      address: "/premium",
    },
    { icon: <BiLogOut />, title: "Logout", address: "/" },
  ];

  // Dropdown menu
  const items = [
    {
      key: "2",
      label: <Link>Buy Premium</Link>,
    },
    {
      key: "3",
      label: <Link>Change Password</Link>,
    },
    {
      key: "1",
      label: <span>Logout</span>,
    },
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
            return (
              <Menu
                Icon={data.icon}
                Title={data.title}
                key={i}
                Address={data.address}
              />
            );
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
              🔥 Access all features with premium ! <span>Buy now !</span>
            </Link>
          </div>
          <div>
            <Link href="/" className="notification">
              <BsBell />
              <span className="num number">4</span>
            </Link>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Link href="/" className="profile">
                <img src={user} />
                <div>
                  <p>Emay Walter</p>
                  <p>
                    Admin <GoChevronDown />
                  </p>
                </div>
              </Link>
            </Dropdown>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};

export default Navbar;
