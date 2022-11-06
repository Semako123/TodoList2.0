import React from "react";
import "./tasks.css";
import { Add, ConstructionOutlined } from "@mui/icons-material";
import Task from "../task/task";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import convertTens from "../utilities/convertTens";
import { LinearProgress } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { onSnapshot } from "firebase/firestore";

const Notes = () => {
  const [task, settask] = useState("");
  const [taskId, settaskId] = useState(0);
  const [tasks, settasks] = useState({});
  const [deadline, setdeadline] = useState("");
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
      await setDoc(
        doc(db, "notes", `${currentUser.uid}`),
        {
          note: [
            ...tasks.data,
            {
              title: task,
              deadline: deadline,
            },
          ],
        },
        { merge: true }
      );
    }
    const emptyString = "";
    settask(emptyString);
    setdeadline(emptyString);
    handleCancelTaskInput();
  };

  const handleUpdate = async () => {
    const new_obj = {
      title: task,
      deadline: deadline,
    };
    const newtasks = [...tasks.data];
    newtasks.splice(taskId, 1, new_obj);
    await setDoc(
      doc(db, "notes", `${currentUser.uid}`),
      { note: newtasks },
      { merge: true }
    );
    fetchTasks();
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
    settaskId(taskId);
    settask(title);
    setdeadline(newDeadline);
    addBtn.style.display = "none";
    doneBtn.style.display = "block";
    handleShowTaskInput();
  };

  const handleDelete = async (id) => {
    const newtasks = [...tasks.data];
    newtasks.splice(id, 1);
    await setDoc(
      doc(db, "notes", `${currentUser.uid}`),
      { note: newtasks },
      { merge: true }
    );
  };

  const fetchTasks = () => {
    onSnapshot(doc(db, "notes", `${currentUser.uid}`), (snapshot) => {
      settasks({ data: snapshot.data().note });
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
              tasks.data.map((task, index) => (
                <Task
                  title={task.title}
                  deadline={task.deadline}
                  key={index}
                  id={index}
                  handleDelete={() => {
                    handleDelete(index);
                  }}
                  handleEdit={() => {
                    handleEdit(index, task.title, task.deadline);
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
