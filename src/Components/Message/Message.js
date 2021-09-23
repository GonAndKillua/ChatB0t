import React from "react";
import "./Message.css";
import img from "../../images/user.svg";

const Message = ({ own, msgToDisplay, btn, setMsg, sendMessage }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={img} alt="" />
        <p className="messageText">{msgToDisplay}</p>
      </div>
      <div className="chatbutton">
        {btn != null
          ? btn.map((value) => (
              <button
                className="chatOptionbutton"
                key={value.title}
                name={value.title}
                onClick={(e) => {
                  setMsg(e.target.name);
                }}
                // key={value.id}
                // onClick={value.title}
              >
                {value.payload}
              </button>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Message;
