import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData } from "../../Redux/student/action";

//component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import LeaderboardRow from "../../Components/Table/LeaderboardRow";

//css imports
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { students } = useSelector((store) => store.student);

  useEffect(() => {
    dispatch(getStudentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      {/* header  */}
      <div className="leaderboard">
        <Header Title={"Ranking"} Address={"Leaderboard"} />
      </div>

      <div className="leaderboardData">
        {/* table */}
        <section className="tableBody">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Quiz attended</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {students
                .sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1))
                .map((data, i) => (
                  <LeaderboardRow key={i} data={data} />
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </Navbar>
  );
};

export default LeaderBoard;
