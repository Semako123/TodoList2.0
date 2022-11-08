import React from "react";
import "./navbar.css";
import logo from "../images/oases.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authActions } from "../../store/authSlicer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <div className="navbar">
      <h1 className="nav-brand">Todo List</h1>
      <img src={logo} alt="Logo of oases" className="logo" />
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
