import React, { useContext, useEffect, useState } from "react";
import "../SingleRoom/SingleRoom.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function EditRoom() {
     const { user } = useContext(AuthContext);
     console.log(user._id)
     
     const location = useLocation();
     const searchParams = new URLSearchParams(location.search);
     
     const [ownerDetails, setOwnerDetails] = useState({});
     const [formData, setFormData] = useState({
          owner_pkey: user._id,
          roomId: searchParams.get("roomId"),
          price: searchParams.get("price"),
          address: searchParams.get("address"),
          city: searchParams.get("city"),
          tenants: searchParams.get("tenants"),
          bhk: searchParams.get("bhk"),
          room_type: searchParams.get("room_type"),
          description: searchParams.get("description"),
          title: searchParams.get("title"),
          owner_pkey: searchParams.get("owner_pkey"),
          photo: searchParams.get("photo")
     });


     useEffect(() => {
          fetchUser();
     }, []);

     const fetchUser = async () => {
          try {
               console.log("formData", formData)
               const response = await axios.get(
                    `http://localhost:4000/api/v1/user/${formData.owner_pkey}/`
               );
               if (response && response.data) {
                    console.log(response)
                    setOwnerDetails(response.data.data);
                    console.log(response.data.data);
               }
          } catch (error) {
               console.error("Error fetching user:", error);
          }
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value
          }));
     };

     return (
          <div className="oneroom-cont">
               <div className="oneroom-wrap">
                    <img src={`http://localhost:4000/tmp/${formData.photo}`} alt="roompic" className="room-pic" />
                    <div className="room-desc">
                         <div className="loc-title">
                              <input
                                   type="text"
                                   name="title"
                                   value={formData.title}
                                   onChange={handleInputChange}
                              />
                         </div><br />
                         <div className="owner">
                              Price: <input
                                   type="text"
                                   name="price"
                                   value={formData.price}
                                   onChange={handleInputChange}
                              />
                         </div><br />
                         <div className="roomLocation">
                              <strong>
                                   <span className="Location">
                                        <input
                                             type="text"
                                             name="city"
                                             value={formData.city}
                                             onChange={handleInputChange}
                                        />
                                   </span>
                              </strong> | <strong>
                                   <span className="roomates">
                                        <input
                                             type="text"
                                             name="bhk"
                                             value={formData.bhk}
                                             onChange={handleInputChange}
                                        />
                                   </span>
                              </strong> | <strong>
                                   <span className="houseType">
                                        <input
                                             type="text"
                                             name="room_type"
                                             value={formData.room_type}
                                             onChange={handleInputChange}
                                        />
                                   </span>
                              </strong>
                         </div>
                         <br />
                         <div>
                              Description: <textarea
                                   name="description"
                                   value={formData.description}
                                   onChange={handleInputChange}
                              />
                         </div>
                         <div className="loc-title">
                              Address: <input
                                   type="text"
                                   name="address"
                                   value={formData.address}
                                   onChange={handleInputChange}
                              />
                         </div>
                         <br />
                         <div className="amenities">
                              <div className="navRight">
                                   <div className="navLinks">
                                        Air Condition &nbsp;&nbsp; Refrigerator &nbsp;&nbsp; Washing
                                        Machine &nbsp;&nbsp; Television &nbsp;&nbsp; Wifi &nbsp;&nbsp;
                                   </div>
                              </div>
                              <br /><br />
                              <div className="contact-owner">
                                   Name: {ownerDetails.username}
                                   &nbsp;&nbsp;
                                   Email: {ownerDetails.email}
                                   &nbsp;&nbsp;
                                   Phone: {ownerDetails.phone}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
