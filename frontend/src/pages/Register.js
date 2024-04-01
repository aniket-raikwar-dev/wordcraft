import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../images/loader.gif";
import LoginAsana from "../images/asana3.png";
import { userIsLogin } from "../redux/actions/userAuthAction";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailValidation = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
  };

  const handleName = (e) => {
    setFormError(false);

    setErrorMessage("");
    setName(e.target.value);
  };

  const handleUserName = (e) => {
    setFormError(false);

    setErrorMessage("");
    setUserName(e.target.value);
  };

  const handleEmailInput = (e) => {
    setFormError(false);

    setErrorMessage("");
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setFormError(false);

    setErrorMessage("");
    setPassword(e.target.value);
  };

  const checkValidation = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name === "" && userName === "" && email === "" && password === "") {
          setFormError(true);
          setErrorMessage("Input field should not be empty!");
          resolve(true);
        } else if (name === "") {
          setFormError(true);
          setErrorMessage("Name should not be empty!");
          resolve(true);
        } else if (userName === "") {
          setFormError(true);
          setErrorMessage("Username should not be empty!");
          resolve(true);
        } else if (email === "") {
          setFormError(true);
          setErrorMessage("Email is required");
          resolve(true);
        } else if (!emailValidation()) {
          setFormError(true);
          setErrorMessage("Invalid Email");
          resolve(true);
        } else if (password === "") {
          setFormError(true);
          setErrorMessage("Password is required");
          resolve(true);
        } else if (password.length < 8) {
          setFormError(true);
          setErrorMessage("Password must be at least 8 characters");
          resolve(true);
        }
        resolve(false);
      }, 1500);
    });
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (!(await checkValidation())) {
      try {
        const body = {
          name,
          username: userName,
          email,
          password,
        };
        const response = await axios.post(
          "https://wordcraft-qfou.onrender.com/api/v1/users/register",
          body
        );
        setIsLoading(false);
        const { token } = response.data;
        localStorage.setItem("token", token);
        dispatch(userIsLogin(true));
        window.open(`${window.location.origin}/explore`, "_self");
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setFormError(true);
        console.log("error: ", error);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-left-container">
        <div className="flex items-center">
          <div style={{ width: "22px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 6C9.23858 6 7 8.68629 7 12C7 15.3137 9.23858 18 12 18C14.7614 18 17 15.3137 17 12C17 8.68629 14.7614 6 12 6ZM14.3253 9.47238C14.747 10.1614 15 11.0413 15 12C15 14.2091 13.6569 16 12 16C11.5589 16 11.1401 15.8731 10.7629 15.6452L14.3253 9.47238ZM12 8C12.4411 8 12.8599 8.12691 13.2371 8.35483L9.67474 14.5276C9.25296 13.8386 9 12.9587 9 12C9 9.79086 10.3431 8 12 8Z"
                fill="rgba(0,0,0,1)"
              ></path>
            </svg>
          </div>
          <h3 className="font-bold ml-2 mt-0.5">WordCraft App</h3>
        </div>
        <p id="log-text1" className="mt-5">
          Sign Up and Continue to do work
        </p>
        <p id="log-text1">for millions of active users to make</p>
        <p id="log-text1">a huge impact.</p>
        <img style={{ width: "100%" }} src={LoginAsana} alt="" />
        <p id="log-text2">
          Wordcraft is an open-source application which provides end-to-end
          privacy and connecting the users across all around the world.
        </p>
      </div>
      <div className="login-right-container">
        <div className="form-container">
          <h3 className="mobile-logo">WordCraft.</h3>
          <h3 className="sign-in-text">Sign Up and continue.</h3>
          <div className="reg-input-field">
            <h4>Name</h4>
            <input
              name={name}
              value={name}
              onChange={(e) => handleName(e)}
              className="input-text"
              type="text"
              placeholder="Aniket Raikwar"
            />
          </div>
          <div className="reg-input-field">
            <h4>Username</h4>
            <input
              name={userName}
              value={userName}
              onChange={(e) => handleUserName(e)}
              className="input-text"
              type="text"
              placeholder="aniket_raikwar"
            />
          </div>
          <div className="reg-input-field">
            <h4>E-mail ID</h4>
            <input
              name={email}
              value={email}
              onChange={(e) => handleEmailInput(e)}
              className="input-text"
              type="text"
              placeholder="aniket.raikwar@gmail.com"
            />
          </div>
          <div className="reg-input-field">
            <h4>Password</h4>
            <div className="password-input">
              <input
                name={password}
                value={password}
                onChange={(e) => handlePasswordInput(e)}
                className="input-text2"
                type={showPassword ? "password" : "text"}
                placeholder="# # # # # # # #"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{ width: "20px" }}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(146,146,146,1)"
                  >
                    <path d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(146,146,146,1)"
                  >
                    <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className={formError ? "form-error" : "form-not-error"}>
            {formError ? errorMessage : ""}
          </div>

          <div onClick={handleRegister} className="login-btn">
            <p>Sign Up</p>
            <div>
              {isLoading ? (
                <div style={{ width: "50px", marginLeft: "10px" }}>
                  <img src={Loader} alt="" />
                </div>
              ) : (
                <div style={{ width: "20px", marginLeft: "10px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      fill="rgba(255,254,254,1)"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="auth-bottom-text">
            Already have an account ?{" "}
            <span onClick={() => navigate("/login")} className="blue-text">
              Log in.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
