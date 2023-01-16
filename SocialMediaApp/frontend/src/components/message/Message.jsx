import "./message.css";
import { format } from "timeago.js"



export default function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
          alt=""
        />
        <p className="messageText">
          {message.text}
        </p>
      </div>

      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
