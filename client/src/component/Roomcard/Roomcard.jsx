import React, { useContext } from "react";
import "./Roomcard.css";
import Room from "../Images/room.jpg";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import roomImg from "../Images/roomTemp.jpg"

export default function Roomcard(props) {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const handleCardClick = (r) => {
    if (user._id === props.owner_pkey) {
      console.log("User is the Owner of the room")
    }
    else {
      navigate({
        pathname: '/one',
        search: `?price=${props.price}&address=${props.address}&city=${props.city}&tenants=${props.tenants}&bhk=${props.bhk}&room_type=${props.room_type}&description=${props.description}&title=${props.title}&owner_pkey=${props.owner_pkey}&photo=${props.images[0]}&list_date=${props.list_date}`
      });
    }
  }

  const chatbtn = () => {
    navigate('/chat');
  }
  return (
    <div className="roomcard" onClick={() => handleCardClick(props)}>
      <div className="roomcardWrapper">
        <div className="roomDetails">
          <div className="allroomDetails">
            <div >
              <img src={props.images[0]?`http://localhost:4000/tmp/${props.images[0]}`:roomImg} alt="img" className="roomImage"></img>
            </div>
            <div className="roomTitle">
              <h3>{props.title}</h3>
            </div>
            <div className="roomLocation">
              <strong><span className="Location">{props.city}</span></strong> | <strong><span className="roomates">{props.bhk}</span></strong> | <strong><span className="houseType">{props.room_type} </span></strong>
            </div>
            <hr></hr>
            <span className="roomDescription" >
              {props.description.length>87?props.description.slice(0,87)+"...":props.description}
            </span>
            <button class="custom-btn btn-13">₹ {props.price}</button>

            <hr></hr>
            <button className="chatbtn" onClick={chatbtn}>Chat with owner</button>
          </div>
        </div>
      </div>
    </div>
  );
}
