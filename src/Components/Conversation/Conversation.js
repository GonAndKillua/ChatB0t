import React, { useState } from "react";
import "./Conversation.css";
import img from "../../images/img1.jpg";

const Conversation = ({ userdata }) => {
  const dummyCarrer = ["Engineering", "Medical"];
  const dummySubject = ["Data Science", "Microbio", "Economics"];
  const [editProfile, setEditProfile] = useState(false);
  // setEditProfile(!editProfile);
  return (
    <>
      <div className="color">
        <div className="contain">
          <button
            className="editbutton"
            onClick={() => setEditProfile(!editProfile)}
          >
            <i class="bi bi-pencil-square"></i>
          </button>
          <div className="conversation">
            <img
              className="conversationImg"
              src={userdata.photo || img}
              alt={userdata.fullname || "Mohit"}
            />

            {editProfile ? (
              <span className="conversationName">
                {userdata.fullname || "Mohit"}
              </span>
            ) : (
              <div class="form-outline">
                <input
                  type="text"
                  id="fName"
                  name="firstName"
                  class="form-control form-control-md"
                  placeholder={userdata.fullname || "fullname"}
                />
              </div>
            )}
          </div>
          {/* universityname */}
          <div className="userdetails text-center text-secondary">
            {editProfile ? (
              <span>
                <i
                  class="fa fa-graduation-cap iconcolor"
                  aria-hidden="true"
                ></i>
                &nbsp; &nbsp;
                {userdata.uname || "Marwadi University"}
              </span>
            ) : (
              <div class="form-outline">
                <input
                  type="text"
                  id="fName"
                  name="firstName"
                  class="form-control form-control-md"
                  placeholder={userdata.fullname || "University"}
                />
              </div>
            )}

            <hr />
          </div>

          <h5 className="scoreheading">RIASEC Score</h5>
          <h6 class="text-left">Realistic</h6>
          <div class="progress mb-2">
            <div
              class="progress-bar"
              role="progressbar"
              style={{ width: "45%", backgroundColor: "#3B8AC4" }}
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
              class="progress-bar"
              role="progressbar"
              style={{ width: "25%", backgroundColor: "#345DA7" }}
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
              class="progress-bar"
              role="progressbar"
              style={{ width: "50%", backgroundColor: "#3B8AC4" }}
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
              class="progress-bar"
              role="progressbar"
              style={{ width: "75%", backgroundColor: "#345DA7" }}
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
              class="progress-bar"
              role="progressbar"
              style={{ width: "90%", backgroundColor: "#3B8AC4" }}
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
              class="progress-bar"
              role="progressbar"
              style={{ width: "72%", backgroundColor: "#345DA7" }}
              aria-valuenow="90"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              72
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
