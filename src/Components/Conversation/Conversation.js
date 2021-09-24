import React from "react";
import "./Conversation.css";
// import img from "../../images/avatar.png";

const Conversation = ({ userdata }) => {
  return (
    <>
      <div className="color container">
        <div className="conversation">
          <img
            className="conversationImg"
            src={`../../../bak/images/${userdata.photo}`}
            alt={userdata.fullname}
          />
          <span className="conversationName">{userdata.fullname}</span>
        </div>

        <div className="userdetails text-secondary">
          <span>
            <i class="bi bi-envelope-fill iconcolor"></i> &nbsp; &nbsp;
            {userdata.email}
          </span>

          <hr />
          <span>
            <i class="bi bi-geo-fill iconcolor"></i> &nbsp; &nbsp;
            {userdata.city}
          </span>
          <br />
          <hr />

          <span>
            <i class="bi bi-geo-alt-fill iconcolor"></i> &nbsp; &nbsp;
            {userdata.state}{" "}
          </span>
          <br />
          <hr />

          <span>
            <i class="bi bi-telephone-fill iconcolor"></i> &nbsp; +1
            {userdata.phone}
          </span>
          <br />
          <hr />

          <span>
            <i class="fa fa-graduation-cap iconcolor" aria-hidden="true"></i>
            &nbsp; &nbsp;
            {userdata.uname}
          </span>
          <br />
          <hr />
        </div>
      </div>
    </>
  );
};

export default Conversation;
