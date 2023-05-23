import Post from "./Post";
import "./css/profile.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { ser } = useParams();
  const [sern, setSern] = useState(null);
  const [exis, setExis] = useState(false);
  const [userblob, setUserblob] = useState([]);
  try {
    fetch(`http://localhost:4000/posts/${ser}`).then((response) => {
      response.json().then((userinfo) => {
        setSern(userinfo);

        setExis(true);
      });
    });
  } catch (e) {
    setExis(false);
  }
  if (exis) {
    fetch(`http://localhost:4000/user/${sern._id}`).then((response) => {
      response.json().then((userbl) => {
        setUserblob(userbl);
      });
    });
  } else
    return (
      <div className="userr">
        <h2>user doesnot exist. Please try again</h2>
      </div>
    );

  return (
    <div className="contiiii">
      <div className="upimgb">
        <img className="innerme" src={require("./imggs/fff.png")} alt="mi" />
        <h2 className="mys">{sern.username}</h2>
        {sern.email}
        <p className="pp">blogg posts :{userblob.length}</p>
      </div>
      <h3 className="betn">bloggs uploads</h3>
      <div>
        {userblob &&
          userblob.map((post) => (
            <div className="myb">
              <Post {...post} />
            </div>
          ))}

        <div>
          {userblob.length === 0 && exis && (
            <p className="pupp">user hasnot made any post.</p>
          )}
        </div>
      </div>
    </div>
  );
}
