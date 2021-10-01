import React from "react";
import "./Message.css";
import img from "../../images/img1.jpg";

const Message = ({ own, msgToDisplay, btn, setMsg, sendMessage, photo }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={own ? photo : img} alt="" />
        <p className="co1 messageText">{msgToDisplay}</p>
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
