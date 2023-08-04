import React, { useEffect } from "react";
import { useSelector } from "react-redux";
//Component imports
import Navbar from "../../Components/Sidebar/Navbar";

// Icons import
import { PiKeyReturnThin, PiCurrencyCircleDollarLight } from "react-icons/pi";
import { FiShoppingCart, FiUserPlus, FiUserMinus } from "react-icons/fi";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import {
  BsTruck,
  BsClipboardMinus,
  BsDownload,
  BsArrowUpLeft,
  BsArrowDownRight,
} from "react-icons/bs";
import { AiOutlineTag, AiOutlineLineChart } from "react-icons/ai";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
} from "recharts";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";

//CSS imports
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Avatar, Tooltip } from "antd";
import "./Home.css";

//Image imports
import demo from "../../Assets/cartoon.svg";

//Data imports
import { barData, lineData, pieData, COLORS } from "../../data.js";
import FloatDiv from "../../Components/FloatDiv/FloatDiv";
import SalesDiv from "../../Components/SalesDiv/SalesDiv";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

const Home = () => {
  const overviewData = [
    { icon: <FiShoppingCart />, title: "Purchase", number: "10,000" },
    { icon: <PiKeyReturnThin />, title: "Sales return", number: "7,000" },
    { icon: <BsTruck />, title: "Orders", number: "180k" },
    { icon: <AiOutlineTag />, title: "sales", number: "4,200" },
    { icon: <BsClipboardMinus />, title: "Purchase rate", number: "5,700" },
    { icon: <AiOutlineLineChart />, title: "Profit", number: "690k" },
  ];

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar>
        <div className="main">
          {/* float toottip */}
          <FloatDiv />

          {/* Header */}
          <Header Title={"Overview"} Address={"Default"} />

          {/* overview section */}
          <div className="overview">
            <div className="overview-left">
              <div>
                <h2> Welcome to LMS</h2>
                <p>Here whats happing in your account today</p>
              </div>
              <div>
                <button>Whats New !</button>
              </div>
              <img src={demo} alt="" />
            </div>
            <div className="overview-right">
              {overviewData?.map(({ icon, title, number }, i) => {
                return (
                  <SalesDiv Icon={icon} Title={title} Number={number} key={i} />
                );
              })}
            </div>
          </div>

          {/* Bar nd Pie Chart */}
          <div className="charts">
            <div className="lineChart">
              <div className="chartHead">
                <p>Overall Balance</p>
              </div>
              <div className="chartBox">
                <div className="chartOne">
                  <ResponsiveContainer>
                    <BarChart width={200} height={300} data={barData}>
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <Legend
                        verticalAlign="top"
                        wrapperStyle={{ lineHeight: "40px" }}
                      />
                      <ReferenceLine y={0} stroke="#000" />
                      <Bar dataKey="Earning" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="chartTwo">
                  <div>
                    <BsDownload />
                    <div>
                      <p>Income</p>
                      <h4>$22,678</h4>
                    </div>
                    <p>+$456</p>
                  </div>
                  <div>
                    <LiaHandHoldingUsdSolid />
                    <div>
                      <p>Expense</p>
                      <h4>$12,057</h4>
                    </div>
                    <p>+$256</p>
                  </div>
                  <div>
                    <PiCurrencyCircleDollarLight />
                    <div>
                      <p>Cashback</p>
                      <h4>8,475</h4>
                    </div>
                    <p>+$256</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pieChart">
              <div className="chartHead">
                <p>Recent Orders</p>
              </div>
              <div className="pieBox">
                <ResponsiveContainer>
                  <PieChart width={800} height={400}>
                    <Pie
                      data={pieData}
                      innerRadius={80}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pieData">
                  <span>100</span>
                  <p>Total Profit</p>
                </div>
              </div>
            </div>
          </div>
          <div className="homeFooter">
            Copyright 2023 © LMS created by Piyush Agrawal
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
