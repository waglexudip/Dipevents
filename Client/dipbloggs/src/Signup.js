import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";
import { message } from "antd";

export default function Login() {
  const navigate = useNavigate();

  function succ() {
    message.success("signup successfull.Log in to continue..");
  }

  function sucf() {
    message.error("signup failed.username or email already in use");
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");

  function shoem() {
    message.error("invalid input....");
  }
  async function register(ev) {
    if (
      username &&
      password &&
      email &&
      email.slice(-10) === "@gmail.com" &&
      password === conpass
    ) {
      ev.preventDefault();

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 333) {
        sucf();
      } else {
        succ();
        navigate("/");
      }
    } else {
      shoem();
    }
  }

  return (
    <div className="con">
      <img src={require("./imggs/imt.png")} alt="mi" />
      <div className="main">
        <h2>SIGNUP</h2>

        <div className="inputsic">
          <input
            placeholder="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          ></input>
          <input
            placeholder="Gmail "
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>

          <input
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
          <input
            placeholder="Confirm Password"
            value={conpass}
            onChange={(ev) => setConpass(ev.target.value)}
          ></input>
        </div>
        <button id="ibut" onClick={register}>
          Signup
        </button>
        <div className="pnsu">
        <h3>Have an account??</h3>

          <button id="ibuti" onClick={() => navigate("/")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
