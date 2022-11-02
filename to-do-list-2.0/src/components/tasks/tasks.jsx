import React from "react";
import "./tasks.css";
import { Add } from "@mui/icons-material";
import Task from "../task/task";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import convertTens from "../utilities/convertTens";
import { LinearProgress } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { query, where, collection, getDocs } from "firebase/firestore";

const Notes = () => {
  const [task, settask] = useState("");
  const [tasks, settasks] = useState({});
  const [id, setid] = useState(0);
  const [deadline, setdeadline] = useState("");
  const API = axios.create({
    baseURL: "https://glacial-river-97602.herokuapp.com/",
  });
  const currentUser = useSelector((state) => state.auth.user);

  const handleTaskChange = (e) => {
    const new_task = e.target.value;
    settask(new_task);
  };

  const handleDeadlineChange = (e) => {
    const new_dataTime = e.target.value;
    setdeadline(new_dataTime);
  };
  const handleCancelTaskInput = () => {
    const form = document.querySelector(".form-visible");
    const task = document.querySelector(".task-bar");
    const addBtn = document.querySelector(".add");
    const doneBtn = document.querySelector(".done");
    addBtn.style.display = "block";
    doneBtn.style.display = "none";
    form.className = "form";
    const emptyString = "";
    settask(emptyString);
    setdeadline("");
    task.classList.remove("task-bar-move");
  };
  const handleShowTaskInput = () => {
    const form = document.querySelector(".form");
    const task = document.querySelector(".task-bar");
    form.className = "form-visible";
    task.classList.add("task-bar-move");
  };

  const handleSubmit = async () => {
    if (task && deadline) {
      const q = query(
        collection(db, "notes"),
        where("__name__", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      let id;
      querySnapshot.forEach((doc) => {
        id = doc.data().id;
      });
      await setDoc(
        doc(db, "notes", `${currentUser.uid}`),
        {
          note: {
            id: id,
            value: task,
            deadline: deadline,
          },
          id: ++id,
        },
        { merge: true }
      );
      const emptyString = "";
      settask(emptyString);
      setdeadline(emptyString);
      handleCancelTaskInput();
    }
  };

  const handleUpdate = () => {
    API.post("/update", { title: task, deadline: deadline, id: id }).then(
      (res) => {
        setid(0);
        fetchTasks();
      }
    );
    handleCancelTaskInput();
  };

  const handleEdit = (taskId, title, deadline) => {
    const addBtn = document.querySelector(".add");
    const doneBtn = document.querySelector(".done");
    const dateTime = new Date(deadline);
    const newDeadline = `${dateTime.getFullYear()}-${convertTens(
      dateTime.getMonth() + 1
    )}-${convertTens(dateTime.getDate())}T${convertTens(
      dateTime.getHours()
    )}:${convertTens(dateTime.getMinutes())}`;
    settask(title);
    setdeadline(newDeadline);
    setid(taskId);
    addBtn.style.display = "none";
    doneBtn.style.display = "block";
    handleShowTaskInput();
  };

  const handleDelete = (id) => {
    API.post("/delete", { id: id }).then((res) => fetchTasks());
  };

  const fetchTasks = () => {
    API.get("/fetch-tasks").then((res) => {
      const new_tasks = res.data;
      settasks(new_tasks);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="tasks">
        <h1 className="greetingBar">What plans do you have today?</h1>
        <div className="header">
          <h3>Tasks</h3>
          <Tooltip title="Add Task">
            <button className="button" onClick={handleShowTaskInput}>
              <Add className="svg" />
            </button>
          </Tooltip>
        </div>
        <div className="form">
          <table>
            <thead>
              <tr>
                <th className="task-title">Task Title</th>
                <th className="task-date">Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="task-title"
                    className="task-form-title"
                    value={task}
                    onChange={handleTaskChange}
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    name="task-deadline"
                    className="task-form-date"
                    value={deadline}
                    onChange={handleDeadlineChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="doneBtn">
            <button type="submit" className="b-done add" onClick={handleSubmit}>
              Add
            </button>
            <button
              type="submit"
              className="b-done done"
              style={{ display: "none" }}
              onClick={handleUpdate}
            >
              Done
            </button>
            <button className="b-done" onClick={handleCancelTaskInput}>
              Cancel
            </button>
          </div>
        </div>
        <div className="task-bar">
          {tasks.data ? (
            tasks.data.length === 0 ? (
              "No tasks added yet. Click on the '+' button to add a new task "
            ) : (
              tasks.data.map((task) => (
                <Task
                  title={task.title}
                  deadline={task.deadline}
                  key={task.id}
                  id={task.id}
                  handleDelete={() => {
                    handleDelete(task.id);
                  }}
                  handleEdit={() => {
                    handleEdit(task.id, task.title, task.deadline);
                  }}
                />
              ))
            )
          ) : (
            <div style={{ width: "100%" }}>
              <LinearProgress />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
