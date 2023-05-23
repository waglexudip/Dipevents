import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import "./css/Post.css";
import { WechatOutlined, SlackOutlined } from "@ant-design/icons";
// import { blue } from "@mui/material/colors";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  comments,
  likes,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img className="hog" src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h3>{title}</h3>
        </Link>
        
          <Link to={"/user/" + author.username} className="author">@{author.username}</Link>
      

        <time>{formatISO9075(new Date(createdAt))}</time>
        <div className="pcon">
          <p className="summary">{summary}</p>
          {/* <div className="trrr">
          <p>likes :</p>
          <p>comments :</p>
          </div> */}
        </div>
      </div>
      {/* <p>likes :</p>
      <p>comments :</p> */}
      <div className="trrr">
        {likes.length}<SlackOutlined style={{'color':'black', fontSize: '26px',marginLeft:'4px',marginRight:'38px'}} />
        {comments.length}<WechatOutlined style={{'color':'green',fontSize: '26px',marginLeft:'6px'}} size={106}/>
      </div>
    </div>
  );
}
