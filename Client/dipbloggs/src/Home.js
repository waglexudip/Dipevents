import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./css/Home.css";
import { AuthContext } from "./AuthContext";
import "./Blogs";

import { Button, message } from "antd";
import { SearchOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import Blogs from "./Blogs";

export default function Home() {
  function he() {
    setSer("");
  }
  const [ isLoggedIn, setIsLoggedIn ]= useState(false);

  const { userin, setUserin } = useContext(AuthContext);

  const [myname, setMyname] = useState(null);
  const [ser, setSer] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then((response) => {
        response.json().then((userInfo) => {
          setMyname(userInfo.username);
          setUserin(userInfo);
          setIsLoggedIn(true);
        });
      });
    } catch (e) {
      setIsLoggedIn(false);
    }
  }, []);

 

  async function logout() {
    await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    message.success("logout successful...");
    navigate("/");
    setIsLoggedIn(false);
  }

  function mepage() {
    navigate("/user/" + myname);
  }

  function Search() {
    if (ser && isLoggedIn) {
      navigate("/user/" + ser);
    } else if (isLoggedIn && !ser) {
      message.error("input field is empty");
    } else {
      message.error("Only logged users can se");
    }
  }

  return (
    <div className="container">
      <div className="tophead">
        <div className="head">
          {isLoggedIn && (
            <Button
              className="upbut"
              type="primary"
              onClick={() => navigate("/UploadBlog")}
            >
              upload
            </Button>
          )}

          <input
            className="hput"
            placeholder="Search for User "
            value={ser}
            onChange={(ev) => setSer(ev.target.value)}
          ></input>
          <Button
            className="xbut"
            type="primary"
            icon={<CloseOutlined />}
            onClick={he}
          ></Button>

          <Button
            className="icobut"
            type="primary"
            icon={<SearchOutlined />}
            onClick={Search}
          >
            {" "}
          </Button>
        </div>

        {isLoggedIn ? (
          <div className="mypro">
            <Button className="mebut" type="primary" icon={<UserOutlined />} onClick={mepage}>
              @{myname}
            </Button>
            <Button className="gut" type="primary" onClick={logout}>
              logout
            </Button>
          </div>
        ) : (
          <Button className="gut" type="primary" onClick={() => navigate("/")}>
            login
          </Button>
        )}
      </div>
      <Blogs />
    </div>
  );
}
