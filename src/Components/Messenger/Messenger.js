import React, { useState, useEffect, useRef } from "react";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import "./Messenger.css";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router";
import chatright from "../../images/green.png";
import ScrollableFeed from "react-scrollable-feed";
import img from "../../images/arrow.png";
import Barchat from "../../Barchart/Barchart";

const Messenger = () => {
  const [mobileToggler, setMobileToggler] = useState(true);
  const [DesktopToggler, setDesktopToggler] = useState(true);
  const [msg, setMsg] = useState("");
  const msgRef = useRef("");
  const [firstAppearance, setFirstAppear] = useState(true);

  const [msgArray, setMsgArray] = useState([
    {
      message: "Hello Student",
      msgOwner: false,
    },
  ]);

  // const [firstAppear, setFirstAppear] = useState(false);
  const [userdata, setuserdata] = useState({
    fullname: "",
    email: "",
    gender: "",
    city: "",
    state: "",
    phone: "",
    uname: "",
  });

  const history = useHistory();
  useEffect(() => {
    if (firstAppearance) {
      try {
        const token = localStorage.getItem("token");
        const result = jwt.verify(token, "this is key");
        setuserdata({
          ...userdata,
          fullname: `${result.firstname} ${result.lastname}`,
          email: result.email,
          gender: result.gender,
          city: result.city,
          state: result.state,
          phone: result.phone,
          uname: result.uname,
          photo: result.photo,
        });
        setFirstAppear((previousState) => !previousState);
      } catch (error) {}
    } else {
      sendMessage();
    }
    // Fetching
  }, [msg]);

  const onEnterkeyhandler = (e) => {
    if (e.key === "Enter") {
      chatSubmitHandler();
    }
  };
  const chatSubmitHandler = () => {
    console.log("reference Variable: ", msgRef.current.value);
    setMsg(msgRef.current.value);
    msgRef.current.value = "";
  };

  const sendMessage = () => {
    setMsgArray((previousState) => [
      ...previousState,
      {
        message: msg,
        msgOwner: true,
      },
    ]);

    // https://59b9bae9273e.ngrok.io/webhooks/rest/webhook"//old one

    fetch(
      "https://4341-2409-4041-2d8a-cb77-6413-5117-440c-a23f.ngrok.io/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
          sender: "default",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      // .then((res) => setreciveMsg(res[0].text))
      .then((res) => {
        if (res.length > 0 && "buttons" in res[0]) {
          setMsgArray((previousState) => [
            ...previousState,
            {
              message: res[0].text,
              msgOwner: false,
              button: res[0].buttons,
            },
          ]);
        } else if (res.length > 0) {
          res.map((valueObj) => {
            setMsgArray((previousState) => [
              ...previousState,
              {
                message: valueObj.text,
                msgOwner: false,
              },
            ]);
          });
        } else {
          console.log(res);
        }
      })

      .catch((err) => console.log(err));

    // setMsg("");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    history.push("/");
  };
  return (
    <>
      <div className="messenger">
        {!mobileToggler && <div class="menuSheet"> </div>}
        <div
          className={`${DesktopToggler ? "hideDesktopMenu" : "chatMenu"} ${
            mobileToggler ? "hideMobileMenu" : "chatMenu"
          }`}
        >
          <div className="chatMenuWrapper">
            <p>
              {!mobileToggler ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-x cross"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setMobileToggler(!mobileToggler);
                  }}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              ) : (
                ""
              )}
            </p>
            <Conversation userdata={userdata} />

            {/* <Barchat /> */}
            <br />

            <button className="chatlogoutButton" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <h4>
              Chat Bot
              <img className="chatright" src={chatright} alt="" />
              <div
                className="mobile-menu"
                onClick={() => {
                  setMobileToggler(!mobileToggler);
                }}
              >
                {mobileToggler ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              {/* // Desktop toggler part */}
              <div
                className="DesktopMenu"
                onClick={() => {
                  setDesktopToggler(!DesktopToggler);
                }}
              >
                {DesktopToggler ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-x "
                    viewBox="0 0 16 16"
                    onClick={() => {
                      setDesktopToggler(!DesktopToggler);
                    }}
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                )}
              </div>
            </h4>

            <div className="chatBoxTop">
              <ScrollableFeed style={{ paddingRight: "1rem" }}>
                {msgArray.map((messageDetails) => (
                  <Message
                    btn={messageDetails.button}
                    own={messageDetails.msgOwner}
                    msgToDisplay={messageDetails.message}
                    setMsg={setMsg}
                    sendMessage={sendMessage}
                    photo={userdata.photo}
                    // childMsgHandler={(data) => {
                    //   sendMessage(data);
                    // }}
                  />
                ))}
              </ScrollableFeed>
            </div>

            <div className="chatBoxBottom">
              <textarea
                ref={msgRef}
                onKeyPress={(e) => {
                  onEnterkeyhandler(e);
                }}
                placeholder="Type Message"
                className="chatMessageInput"
              ></textarea>
              <button
                className="chatSubmitButton"
                onClick={chatSubmitHandler}
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
