import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// Image imports
import user from "../../Assets/useravatar.png";
import logo from "../../Assets/logo.png";

// Icon imports
import { BiLogOut, BiUserVoice } from "react-icons/bi";
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
import { useDispatch, useSelector } from "react-redux";
// CSS imports
import "./Navbar.css";
import Menu from "../Menu/Menu";
import { Dropdown } from "antd";
import { authLogout } from "../../Redux/auth/action";

const Navbar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  if (!auth.data.isAuthenticated) {
    return navigate("/");
  }

  const {
    user: { userType, name, premium },
  } = useSelector((store) => store.auth.data);

  //Sidebar toggle state
  const [toggle, setToggle] = useState(true);
  //Sidebar menu
  const adminData = [
    { icon: <HiOutlineHome />, title: "Dashboard", address: "/home" },
    { icon: <RiAdminLine />, title: "Admins", address: "/admin" },
    { icon: <BiUserVoice />, title: "Tutors", address: "/tutor" },
    { icon: <PiStudentDuotone />, title: "Students", address: "/student" },
    { icon: <TbBrandSpeedtest />, title: "Quizzes", address: "/quizzes" },
    { icon: <TbLayoutGridAdd />, title: "Contents", address: "/contents" },
    { icon: <TbUsers />, title: "Leader Board", address: "/leaderboard" },
  ];
  const studentData = [
    { icon: <HiOutlineHome />, title: "Dashboard", address: "/home" },
    { icon: <TbBrandSpeedtest />, title: "Quizzes", address: "/quizzes" },
    { icon: <TbLayoutGridAdd />, title: "Contents", address: "/contents" },
    { icon: <AiOutlineQuestion />, title: "Doubts", address: "/doubts" },
    { icon: <TbMessages />, title: "Message", address: "/messages" },
    { icon: <TbUsers />, title: "Leader Board", address: "/leaderboard" },
    { icon: <BsBookmarkCheck />, title: "Bookmarks", address: "/bookmarks" },
  ];
  const tutorData = [
    { icon: <HiOutlineHome />, title: "Dashboard", address: "/home" },
    { icon: <PiStudentDuotone />, title: "Students", address: "/student" },
    { icon: <TbBrandSpeedtest />, title: "Quizzes", address: "/quizzes" },
    { icon: <TbLayoutGridAdd />, title: "Contents", address: "/contents" },
    { icon: <AiOutlineQuestion />, title: "Doubts", address: "/doubts" },
    { icon: <TbMessages />, title: "Message", address: "/messages" },
    { icon: <TbUsers />, title: "Leader Board", address: "/leaderboard" },
  ];

  // Dropdown menu
  const items = [
    {
      key: "3",
      label: <Link>Change Password</Link>,
    },
    {
      key: "1",
      label: <span onClick={() => handleLogout()}>Logout</span>,
    },
  ];

  const handleLogout = () => {
    dispatch(authLogout());
  };

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
          {userType === "Tutor"
            ? tutorData?.map((data, i) => {
                return (
                  <Menu
                    Icon={data.icon}
                    Title={data.title}
                    key={i}
                    Address={data.address}
                  />
                );
              })
            : ""}
          {userType === "Student"
            ? studentData?.map((data, i) => {
                return (
                  <Menu
                    Icon={data.icon}
                    Title={data.title}
                    key={i}
                    Address={data.address}
                  />
                );
              })
            : ""}
          {userType === "Admin"
            ? adminData?.map((data, i) => {
                return (
                  <Menu
                    Icon={data.icon}
                    Title={data.title}
                    key={i}
                    Address={data.address}
                  />
                );
              })
            : ""}
          {userType == "Student" && !premium ? (
            <Menu
              Icon={<MdOutlineWorkspacePremium />}
              Title={"Premium"}
              Address={"/premium"}
            />
          ) : (
            ""
          )}
          <span onClick={() => handleLogout()}>
            <Menu Icon={<BiLogOut />} Title={"Logout"} Address={""} />
          </span>
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
            {userType == "Student" ? (
              !premium ? (
                <Link href="/" className="nav-link">
                  🔥 Access all features with premium ! <span>Buy now !</span>
                </Link>
              ) : (
                "🔥You are a premium member !"
              )
            ) : (
              <Link href="/" className="nav-link">
                🔥 Welcome to LMS !
              </Link>
            )}
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
                  <p>{name}..</p>
                  <p>
                    {userType} <GoChevronDown />
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
