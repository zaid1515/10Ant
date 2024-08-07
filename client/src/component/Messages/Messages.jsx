import React, { useState,  createContext, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Person1 from "../Images/person1.jpg";
import "./Messages.css";

export default function Messages( {messages,User}) {
  const { user: { _id } } = useContext(AuthContext);
  const [incomingMessages, setIncomingMessages] = useState([messages]); 

  return (
    <>
      {incomingMessages?.map((m) => {
        return (
          <div
            className={
              m.sender == _id
                ? "messages-own"
                : "messages"
            }
            key={m._id}
          >
            <div className="messageContainer">
              <div className="messagesWrapper">
                <div className={m.sender == _id
                        ? "chat-own"
                        : "chat"}>
                  <p
                    className={
                      m.sender == _id
                        ? "message-own"
                        : "message"
                    }
                  >
                    {m.text}
                  </p>
                  <div className="profImgDiv">
                    <img src={Person1} alt="" className="profImg" />
                  </div>
                </div>
              </div>
              <div className="usernameWrapper">
                <small
                  className={
                    m.sender == _id
                      ? "username-own"
                      : "username"
                  }
                >
                  User ID: {m.sender}
                </small>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
