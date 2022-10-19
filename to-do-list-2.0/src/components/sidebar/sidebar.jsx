import React from "react";
import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import convertTens from "../utilities/convertTens";

const Sidebar = () => {
  const [date, setdate] = useState(new Date());
  const [tasks, settasks] = useState({});
  let hours;
  let minutes;
  hours = date.getHours();
  minutes = date.getMinutes();

  const API = axios.create({
    baseURL: "https://glacial-river-97602.herokuapp.com/",
  });

  const fetchTasks = () => {
    API.get("/fetch-tasks").then((res) => {
      const new_tasks = res.data;
      settasks(new_tasks);
    });
  };

  useEffect(() => {
    setInterval(() => {
      setdate(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetchTasks();
    }, 2000);
  }, []);
  return (
    <div className="sidebar">
      <div className="greeting">
        {hours < 16
          ? hours < 12
            ? "Good Morning"
            : "Good Afternoon"
          : "Good Evening"}
      </div>
      <div>
        {hours}
        <span className="blink">:</span>
        {minutes < 10 ? "0" + minutes : minutes}
      </div>
      <div className="upcoming">Today's task(s)</div>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">TITLE</th>
            <th className="th">STATUS</th>
            <th className="th">DEADLINE</th>
          </tr>
        </thead>
        <tbody>
          {tasks.data ? (
            tasks.data.map((task) => {
              let deadlineDT = new Date(task.deadline);
              let taskAv;
              if (deadlineDT.getDate() == date.getDate()) {
                deadlineDT > date ? (taskAv = true) : (taskAv = false);
                return (
                  <tr className="tr" key={task.title}>
                    <td className="td">{task.title}</td>
                    <td className="td">{taskAv ? "Active" : "Expired"}</td>
                    <td className="td">{`${convertTens(
                      deadlineDT.getHours()
                    )}:${convertTens(deadlineDT.getMinutes())}`}</td>
                  </tr>
                );
              }
            })
          ) : (
            <tr>
              <td>
                <LinearProgress />
              </td>
              <td>
                <LinearProgress />
              </td>
              <td>
                <LinearProgress />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
