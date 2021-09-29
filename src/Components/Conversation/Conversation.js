import React from "react";
import "./Conversation.css";

const Conversation = ({ userdata }) => {
  const dummyCarrer = ["Engineering", "Medical"];
  const dummySubject = ["Data Science", "Microbio", "Economics"];
  return (
    <>
      <div className="color">
        <div className="contain">
          <div className="conversation">
            <img
              className="conversationImg"
              src={userdata.photo}
              alt={userdata.fullname}
            />
            <span className="conversationName">{userdata.fullname}</span>
          </div>

          <div className="userdetails text-secondary">
            {/* <span>
            <i class="bi bi-envelope-fill iconcolor"></i> &nbsp; &nbsp;
            {userdata.email}
          </span>
          <hr /> */}
            {/* <span>
            <i class="bi bi-geo-alt-fill iconcolor"></i> &nbsp; &nbsp;
            {userdata.state}{" "}
          </span>
          <br />
          <hr /> */}
            <span>
              <i class="fa fa-graduation-cap iconcolor" aria-hidden="true"></i>
              &nbsp; &nbsp;
              {userdata.uname}
            </span>
            <hr />
            <h5 className="scoreheading">RIASEC Score</h5>
            <h6 class="text-left">Realistic</h6>
            <div class="progress mb-2">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: "45%" }}
                aria-valuenow="45"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                45
              </div>
            </div>

            <h6 class="text-left">Investigative</h6>
            <div class="progress mb-2">
              <div
                class="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                25
              </div>
            </div>

            <h6 class="text-left">Artistic</h6>
            <div class="progress mb-2">
              <div
                class="progress-bar progress-bar-striped bg-info"
                role="progressbar"
                style={{ width: "50%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                50
              </div>
            </div>

            <h6 class="text-left">Social</h6>
            <div class="progress mb-2">
              <div
                class="progress-bar progress-bar-striped bg-warning"
                role="progressbar"
                style={{ width: "75%" }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                75
              </div>
            </div>

            <h6 class="text-left">Enterprising </h6>
            <div class="progress mb-2">
              <div
                class="progress-bar progress-bar-striped bg-danger"
                role="progressbar"
                style={{ width: "90%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                90
              </div>
            </div>
            <h6 class="text-left">Conventional </h6>
            <div class="progress mb-4">
              <div
                class="progress-bar progress-bar-striped bg-secondary"
                role="progressbar"
                style={{ width: "72%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                72
              </div>
            </div>
          </div>
          <div>
            <h5>
              Interested Career title:
              <ol>
                {dummyCarrer.map((carrer) => (
                  <li>{carrer}</li>
                ))}
              </ol>
            </h5>

            <h5>
              Subject Intrest:
              <ol>
                {dummySubject.map((Subject) => (
                  <li>{Subject}</li>
                ))}
              </ol>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
