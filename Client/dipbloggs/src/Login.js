import React, { useState, useContext } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  function wrng() {
    message.error("Username and password cannot be empty...");
  }
  function hor() {
    message.error("Login failed.Try again");
  }
  async function Login(ev) {
    if (username && password) {
      ev.preventDefault();
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        hor();
      } else {
        navigate("/Home");
        message.success("login successful");
        setIsLoggedIn(true);
      }
    } else {
      wrng();
    }
  }
  const navigate = useNavigate();
  return (
    <div className="con">
      <img className="img" src={require("./imggs/imt.png")} alt="mi" />
      <div className="main">
        <div className="ogies">
          <img className="img2" src={require("./imggs/unm.png")} alt="mi" />

          <h1>Dipbloggs</h1>
        </div>
        <h2>LOGIN</h2>
        <div className="inputic">
          <input
            placeholder="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          ></input>
          <input
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
        </div>
        <button id="ibut" onClick={Login}>
          Login
        </button>
        <div className="pnsu">
          <h3>Don't have an account??</h3>
          <button id="ibuti" onClick={() => navigate("/Signup")}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
