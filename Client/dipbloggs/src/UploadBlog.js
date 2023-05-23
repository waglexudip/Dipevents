import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./css/up.css";
import { Button, message } from "antd";

export default function UploadBlog() {
  const navigate = useNavigate();

  const [titl, setTitl] = useState("");
  const [summ, setSumm] = useState("");
  const [files, setFiles] = useState('');
  const [cont, setCont] = useState("");

  const data = new FormData();
  data.set('title', titl);
  data.set('summary', summ);
  data.set('content', cont);
  data.set('file', files[0]);

  async function createNewPost(ev) {
    if (titl && summ && cont && files){
  ev.preventDefault();
  const response = await fetch('http://localhost:4000/post', {
    method: 'POST',
    body: data,
    credentials: 'include',
  });
  if (response.ok) {
    message.success('blogg uploaded');
    navigate('/Home');
  }
} else{
  message.error('input fields arenot properly filled')
}
}

  
  function cnl() {
    message.error("cancelled");
    navigate("/Home");
  }

  

  // const navigate = useNavigate();
  return (
    <div className='alc'>
      <div className="upblog">
        <input
          type="title"
          placeholder="Title"
          style={{ width: "50vw" }}
          value={titl}
          onChange={(ev) => setTitl(ev.target.value)}
        />
        <input
          type="summary"
          placeholder="summary"
          style={{ width: "50vw" }}
          value={summ}
          onChange={(ev) => setSumm(ev.target.value)}
        />
        <input
          type="file"
          style={{
            "margin-top": "20px",
            width: "50vw",
            "margin-bottom": "20px",
          }}
          onChange={ev => setFiles(ev.target.files)}
        />
        <textarea
          cols="100"
          rows="20"
          onChange={(ev) => setCont(ev.target.value)}
          value={cont}
          placeholder="write what's on your mind......."
        ></textarea>
      </div>
      <div className="horbut">
        <Button className="sdf" onClick={cnl} type="primary">
          cancel
        </Button>
        <Button className="sd" type="primary" onClick={createNewPost}>
          submit
        </Button>
      </div>
    </div>
  );
}
