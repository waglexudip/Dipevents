import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import "./css/myp.css";
import { Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userin } = useContext(AuthContext);
  const [mmm, setMmm] = useState("");
  // const [pk, setPk] = useState(0);
  const fgh = userin.username;
  const { id } = useParams();

  async function liker() {
    const response = await fetch(
      `http://localhost:4000/postslike/${id}/${fgh}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      message.success("post liked");
    } else {
      message.error("like request failed");
    }
  }

  async function comer() {
    const response = await fetch(
      `http://localhost:4000/postscom/${id}/${mmm}/${fgh}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      message.success("comment sent");
    } else {
      message.error("comment request failed");
    }
  }

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="alc">
      <div className="aut">
        <h2>{postInfo.title}</h2>
        <h3>@{postInfo.author.username}</h3>
      </div>

      <div className="haver">
        <div className="wqw">
          <time className="tim">
            {"Uploaded on   " + formatISO9075(new Date(postInfo.createdAt))}
          </time>
          <div className="parap">
            <p className="fgfg">{postInfo.content}</p>
            <div className="buses">
              <h3>{postInfo.likes.length}</h3>
              <Button className="sbut" type="primary" onClick={liker}>
                {"Like"}
              </Button>
              <input
                className="nput"
                placeholder="comment "
                value={mmm}
                onChange={(ev) => setMmm(ev.target.value)}
              ></input>
              <Button className="sbut" type="primary" onClick={comer}>
                {"Comment"}
              </Button>
              <h3>{postInfo.comments.length}</h3>
            </div>

            <div className="pdon">
              <h3> user's comments.</h3>
              {postInfo.comments.length > 0 &&
                postInfo.comments.map((po) => (
                  <div className="puf">
                    <UserOutlined />
                    <p>{po}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="dfdz">
          <img
            id="posmm"
            src={`http://localhost:4000/${postInfo.cover}`}
            alt=""
          />

          {userin.id === postInfo.author._id && (
            <div>
              <Link className="edbtn" to={`/edit/${postInfo._id}`}>
                <Button className="sbut" type="primary">
                  Edit this post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
