import React from "react";

//Component imports
import Navbar from "../../Components/Sidebar/Navbar";

// Icons import
import { BiHome } from "react-icons/bi";
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

const Home = () => {
  const overviewData = [
    { icon: <FiShoppingCart />, title: "Purchase", number: "10,000" },
    { icon: <PiKeyReturnThin />, title: "Sales return", number: "7,000" },
    { icon: <BsTruck />, title: "Orders", number: "180k" },
    { icon: <AiOutlineTag />, title: "sales", number: "4,200" },
    { icon: <BsClipboardMinus />, title: "Purchase rate", number: "5,700" },
    { icon: <AiOutlineLineChart />, title: "Profit", number: "690k" },
  ];

  return (
    <div>
      <Navbar>
        <div className="main">
          {/* float toottip */}
          <FloatDiv />

          {/* Header */}
          <div className="head-title">
            <div className="head-left">Default</div>
            <div className="head-right">
              <BiHome /> <p>/ Dashboard</p> <span>/ Default</span>
            </div>
          </div>

          {/* overview section */}
          <div className="overview">
            <div className="overview-left">
              <div>
                <h2> Welcome to cuba</h2>
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
          <div className="timeline">
            <div>
              <div className="chartHead">
                <p>Activity</p>
              </div>
              <VerticalTimeline layout="1-column-left" lineColor="lightblue">
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "transparent",
                    color: "black",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid rgb(33, 150, 243)",
                  }}
                  date="8th March, 2022"
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                  icon={<LiaHandHoldingUsdSolid />}
                >
                  <h3 className="vertical-timeline-element-title">
                    Updated Product
                  </h3>{" "}
                  <p>Creative Direction, User Experience, Visual...</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  date="8th March, 2022"
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                  icon={<LiaHandHoldingUsdSolid />}
                >
                  <h3 className="vertical-timeline-element-title">
                    Updated Product
                  </h3>{" "}
                  <p>Creative Direction, User Experience, Visual...</p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
            <div>
              <div className="chartHead">
                <p>Recent Sales</p>
              </div>
              <div className="recentSales">
                <div>
                  <div>
                    <img
                      src="https://admin.pixelstrap.com/cuba/assets/images/dashboard/user/1.jpg"
                      alt="user"
                    />
                    <div>
                      <p>Jane Cooper</p>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                  <p>$200.00</p>
                </div>
                <div>
                  <div>
                    <img
                      src="https://admin.pixelstrap.com/cuba/assets/images/dashboard/user/1.jpg"
                      alt="user"
                    />
                    <div>
                      <p>Jane Cooper</p>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                  <p>$200.00</p>
                </div>
                <div>
                  <div>
                    <img
                      src="https://admin.pixelstrap.com/cuba/assets/images/dashboard/user/1.jpg"
                      alt="user"
                    />
                    <div>
                      <p>Jane Cooper</p>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                  <p>$200.00</p>
                </div>
                <div>
                  <div>
                    <img
                      src="https://admin.pixelstrap.com/cuba/assets/images/dashboard/user/1.jpg"
                      alt="user"
                    />
                    <div>
                      <p>Jane Cooper</p>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                  <p>$200.00</p>
                </div>
                <div>
                  <div>
                    <img
                      src="https://admin.pixelstrap.com/cuba/assets/images/dashboard/user/1.jpg"
                      alt="user"
                    />
                    <div>
                      <p>Jane Cooper</p>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                  <p>$200.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lastSection">
            <div className="leftSection">
              <div className="totalUser">
                <div className="chartHead">
                  <p>Total Users</p>
                </div>
                <div className="totalUserData">
                  <div>
                    <div>
                      <FiUserPlus />
                    </div>
                    <div>
                      <h3>178,098</h3>
                      <p>
                        <BsArrowUpLeft />
                        +30.89
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <FiUserMinus />
                    </div>
                    <div>
                      <h3>178,098</h3>
                      <p>
                        <BsArrowDownRight />
                        -08.89
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="followersGrowth">
                <div className="chartHead">
                  <p>Followers Growth</p>
                </div>
                <div className="LineChart">
                  <ResponsiveContainer>
                    <LineChart width={500} height={300} data={lineData}>
                      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="paperNote">
              <div className="chartHead">
                <p>Paper Note</p>
              </div>
              <div className="paperNoteData">
                <img
                  src="https://admin.pixelstrap.com/cuba/assets/images/dashboard/papernote.jpg"
                  alt="img"
                />
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <div>
                  <button>SAAS</button>
                  <button>E-commerce</button>
                  <button>Crypto</button>
                  <button>Project</button>
                  <button>SAAS</button>
                  <button>+9</button>
                </div>
                <div className="userList">
                  <Avatar.Group
                    maxCount={5}
                    size="large"
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{ backgroundColor: "#87d068" }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{ backgroundColor: "#1677ff" }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                  <span>$239,098 (Budget)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="homeFooter">
            Copyright 2023 © Cuba theme clone by Piyush Agrawal
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
