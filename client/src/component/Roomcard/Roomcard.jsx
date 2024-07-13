import React, { useState, useContext } from "react";
import "./Roomcard.css";
import Room from "../Images/room.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import roomImg from "../Images/roomTemp.jpg";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";
import axios from 'axios';

const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <p>Do you want to delete this record?</p>
        <button className="btnCancel" onClick={onClose}>No</button>
        <button className="btnConfirm" onClick={onConfirm}>Yes</button>
      </div>
    </div>
  );
};

export default function Roomcard(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (r) => {
    if (user._id === props.owner_pkey) {
      console.log("User is the Owner of the room");
    } else {
      navigate({
        pathname: '/one',
        search: `?price=${props.price}&address=${props.address}&city=${props.city}&tenants=${props.tenants}&bhk=${props.bhk}&room_type=${props.room_type}&description=${props.description}&title=${props.title}&owner_pkey=${props.owner_pkey}&photo=${props.images[0]}&list_date=${props.list_date}`
      });
    }
  };

  const chatbtn = (e) => {
    e.stopPropagation();
    navigate('/chat');
  };

  const updateRoom = (e) => {
    e.stopPropagation();
    navigate('/edit-room?roomId=' + props._id);
  };

  const deleteRoom = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/room/deleteroom?roomId=${props._id}`);
      if (response.status === 200) {
        window.location.reload();
      } else {
        toast.error("Failed to delete room");
      }
    } catch (error) {
      toast.error("Failed to delete room", error.response.data.message);
    }
  };

  return (
    <div className="roomcard" onClick={() => handleCardClick(props)}>
      <div className="roomcardWrapper">
        <div className="roomDetails">
          <div className="allroomDetails">
            <div>
              <img src={props.images[0] ? `http://localhost:4000/tmp/${props.images[0]}` : roomImg} alt="img" className="roomImage"></img>
            </div>
            <div className="roomTitle">
              <h3>{props.title}</h3>
            </div>
            <div className="roomLocation">
              <strong><span className="Location">{props.city}</span></strong> | <strong><span className="roomates">{props.bhk}</span></strong> | <strong><span className="houseType">{props.room_type} </span></strong>
            </div>
            <hr></hr>
            <span className="roomDescription">
              {props.description.length > 87 ? props.description.slice(0, 87) + "..." : props.description}
            </span>
            <div style={{ display: 'flex' }}>
              <button className="custom-btn btn-13">₹ {props.price}</button>
              {props.user === "owner" && (
                <>
                  {/* <FaEdit */}
                    {/* style={{ color: 'orange', margin: '10px 40px', cursor: 'pointer', fontSize: '20px' }} */}
                    {/* onClick={updateRoom} */}
                  {/* /> */}
                  <FaTrash
                    style={{ color: 'red', margin: '10px', cursor: 'pointer', fontSize: '20px' }}
                    onClick={deleteRoom}
                  />
                </>
              )}

            </div>
            <hr></hr>
            {/* {props.page==="rooms" && ( */}
              
            <button className="chatbtn" onClick={chatbtn}>Chat with owner</button>
            {/* )} */}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal show={showModal} onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
    </div>
  );
}
