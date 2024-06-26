import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import coverImg from "../../component/Images/coverimg.jpg";
// import profilePic from "../../component/Images/profilepic.jpg";
import Roomcard from "../../component/Roomcard/Roomcard";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [Rooms, setRooms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/room/");
      if (response && response.data) {
        const filteredRooms = response.data.data.filter(
          (item) => item.owner_pkey === user._id
        );
        setFilteredData(filteredRooms);
        console.log(filteredData)
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/" + user._id + "/"
      );
      if (response && response.data) {
        setUserDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchUser();
  }, [user._id]);

  return (
    <>
      <div className="profile">
        {/* <Sidebar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <img src={coverImg} alt="coverimg" className="profileCoverImg" />
            <img
              src={
                userDetails.profilePic &&
                userDetails.profilePic.startsWith("http")
                  ? userDetails.profilePic
                  : "http://localhost:4000/tmp/" + userDetails.profilePic
              }
              alt="profile"
              className="profilePic"
            ></img>
            <span className="profileInfo">
              <h2 className="username">{user.username}</h2>
              <span className="userInfo">{userDetails.bio}</span>
            </span>
          </div>
          <div className="profileRightBottom">
            <h2>YOUR LISTINGS:</h2>
            <hr />
            <div className="roomCards">
              {filteredData.length > 0 ? (
                filteredData.map((r) => {
                  return <Roomcard key={r._id} {...r} />;
                })
              ) : (
                <div className="noList">
                  <h2>YOU HAVE NOT LISTED ANY ROOMS</h2>
                  <Link to={"/addroom"}>
                    <h4>Click Here to add rooms</h4>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
