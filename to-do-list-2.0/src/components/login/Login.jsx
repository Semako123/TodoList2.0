import React from "react";
import "./login.css";
import { auth } from "../firebase/firebase";
import image from "../images/Checklist.gif";
import image2 from "../images/Completed.gif";
import logo from "../images/oases.png";
import {
  InputAdornment,
  InputLabel,
  TextField,
  IconButton,
  Input,
  FormControl,
} from "@mui/material";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authActions } from "../../store/authSlicer";
import { db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const newUser = useSelector((state) => state.auth.newUser);
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [conPassword, setconPassword] = useState("");
  const [errMessage, seterrMessage] = useState({
    Email: "",
    password: "",
    conPassword: "",
  });
  const [errorState, seterrorState] = useState({
    password: false,
    Email: false,
    conPassword: false,
  });

  const createUserNote = async () => {
    console.log(currentUser);
    await setDoc(doc(db, "notes", `${currentUser.uid}`), {
      notes: [],
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    if (newUser) {
      createUserNote();
    }
  }, [currentUser]);

  useEffect(() => {
    handlePasswordValid();
    handleConPasswordValid();
    handleEmailValid();
  }, [Password, conPassword, Email]);

  const [value, setValue] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  const handleConPasswordValid = () => {
    if (conPassword !== password) {
      seterrMessage({ ...errMessage, conPassword: "Passwords don't match" });
      seterrorState({ ...errorState, conPassword: true });
    } else {
      seterrMessage({ ...errMessage, conPassword: "" });
      seterrorState({ ...errorState, conPassword: false });
    }
  };

  const handleEmailValid = () => {
    if (Email.length < 5) {
      seterrMessage({
        ...errMessage,
        Email: "Email is less than 5 characters",
      });
      seterrorState({ ...errorState, Email: true });
    } else {
      seterrMessage({ ...errMessage, Email: "" });
      seterrorState({ ...errorState, Email: false });
    }
  };
  const handlePasswordValid = () => {
    if (password.length < 8) {
      seterrMessage({
        ...errMessage,
        password: "Password is less than 8 characters",
      });
      seterrorState({ ...errorState, password: true });
    } else {
      seterrMessage({ ...errMessage, password: "" });
      seterrorState({ ...errorState, password: false });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const setDefault = () => {
    setValue({ ...value, showPassword: false });
    setpassword("");
    setEmail("     ");
    setconPassword("");
    seterrMessage({ Email: "", password: "", conPassword: "" });
    seterrorState({ Email: false, password: false, conPassword: false });
  };

  const handleSwitchSignup = () => {
    const formPage = document.querySelector(".loginSection");
    const imageSec = document.querySelector(".imageSection");
    formPage.style.transform = "translateY(-600px)";
    imageSec.style.transform = "translateY(302px)";
    setDefault();
  };

  const handleSwitchLogin = () => {
    const formPage = document.querySelector(".loginSection");
    const imageSec = document.querySelector(".imageSection");
    formPage.style.transform = "translateY(0px)";
    imageSec.style.transform = "translateY(-302px)";
    setDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setpassword(e.target.value);
  };

  const handleConPassChange = (e) => {
    setconPassword(e.target.value);
  };

  const handleSignupRq = () => {
    handleConPasswordValid();
    handlePasswordValid();
    handleEmailValid();
    if (!(errMessage.conPassword || errMessage.password || errMessage.Email)) {
      createUserWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
          const user = JSON.stringify(userCredential.user);
          dispatch(authActions.setNewUser());
          dispatch(authActions.login(user));
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };
  const handleLoginRq = () => {
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        const user = JSON.stringify(userCredential.user);
        dispatch(authActions.login(user));
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <div className="background">
        <div className="outerBox">
          <div className="divSection imageSection">
            <img
              src={image}
              alt="Oases Sign Up page"
              className="imageSection"
            />
            <img src={image2} alt="Oases Login Page" className="imageSection" />
          </div>
          <div className="divSection loginSection">
            <div>
              <img src={logo} alt="Logo of oases" className="loginlogo" />
              <h5 className="intro">Welcome to Oases Todo</h5>
              <div className="formField">
                <TextField
                  className="textField"
                  label="Email"
                  variant="standard"
                  value={Email}
                  onChange={handleEmailChange}
                  type="email"
                />
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="standard-adornment-password"
                    style={{ margin: "-5px 15%" }}
                  >
                    Password
                  </InputLabel>
                  <Input
                    label="Password"
                    className="passField"
                    type={value.showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePassChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ margin: "-10px auto" }}
                        >
                          {value.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <button className="loginBtn" onClick={handleLoginRq}>
                  Login
                </button>
              </div>
              <div className="bottom">
                <h6 className="bottomText">Don't have an account yet?</h6>
                <h6
                  className="bottomLink bottomText"
                  onClick={handleSwitchSignup}
                >
                  Create an account
                </h6>
              </div>
            </div>
            <div>
              <img src={logo} alt="Logo of oases" className="loginlogo" />
              <h5 className="intro">Welcome to Oases Todo</h5>
              <div className="formField">
                <TextField
                  error={errorState.Email}
                  className="textField"
                  label="Email"
                  variant="standard"
                  value={Email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailValid}
                  helperText={errMessage.Email}
                  type="email"
                />
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="standard-adornment-password"
                    error={errorState.password}
                    style={{ margin: "-5px 15%" }}
                  >
                    Password
                  </InputLabel>
                  <Input
                    error={errorState.password}
                    className="passField"
                    type={value.showPassword ? "text" : "password"}
                    value={password}
                    onBlur={handlePasswordValid}
                    onChange={handlePassChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ margin: "-10px auto" }}
                        >
                          {value.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className="errorMessage">{errMessage.password}</div>
                <FormControl variant="standard">
                  <InputLabel
                    htmlFor="standard-adornment-password"
                    style={{ margin: "-5px 15%" }}
                    error={errorState.conPassword}
                  >
                    Confirm Password
                  </InputLabel>
                  <Input
                    error={errorState.conPassword}
                    className="passField"
                    type={value.showPassword ? "text" : "password"}
                    value={conPassword}
                    onBlur={handleConPasswordValid}
                    onChange={handleConPassChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ margin: "-10px auto" }}
                        >
                          {value.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <div className="errorMessage">{errMessage.conPassword}</div>
                </FormControl>
                <button onClick={handleSignupRq} className="loginBtn">
                  Signup
                </button>
              </div>
              <div className="bottom">
                <h6 className="bottomText">Already created an account?</h6>
                <h6
                  className="bottomText bottomLink"
                  onClick={handleSwitchLogin}
                >
                  Login
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
