import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Button } from "antd";

export default function EditPost() {
  const navigate = useNavigate();

  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    navigate('/post/'+id);
  }

  return (
    
    <div>
    <div className="upblog">
      <input
        type="title"
        placeholder="Title"
        style={{ width: "50vw" }}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="summary"
        style={{ width: "50vw" }}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
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
        onChange={(ev) => setContent(ev.target.value)}
        value={content}
        placeholder="write what's on your mind......."
      ></textarea>
    </div>
    <div className="horbut">
      
      <Button className="sd" type="primary" onClick={updatePost}>
        submit
      </Button>
    </div>
  </div>
);
}

