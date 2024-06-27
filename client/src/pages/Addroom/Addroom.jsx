import React, { useState, useContext } from 'react';
import '../../pages/Addroom/Addroom.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import TitBhkOpt from '../../component/Addroom/TitBhkOpt';
import GendRmsType from '../../component/Addroom/GendRmsType';
import AddAmen from '../../component/Addroom/AddAmen';
import PriceImg from '../../component/Addroom/PriceImg';

function Addroom() {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const FormTitles = ["Add New Room", "Room Details", "Enter Address", "Pricing"];

  const [roomData, setroomData] = useState({
    title: "",
    bhk: "1 BHK",
    roomOptions: "",
    gender: "",
    houseType: "Flat",
    address: "",
    city: "",
    state: "",
    zip: 0,
    description: "",
    tenants: 1,
    sqft: 0,
    deposit: 0,
    rent: 0,
    images: []
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [genderSelected, setGenderSelected] = useState(null);
  const [BhkSelected, setBhkSelected] = useState("1 BHK");
  const [houseTypeSelected, sethouseTypeSelected] = useState("Flat");

  function handleInput(event) {
    const { name, value } = event.target;
    if (name === 'roomOptions') {
      setSelectedOption(value);
    } else if (name === 'gender') {
      setGenderSelected(value);
    } else if (name === 'bhk') {
      setBhkSelected(value);
    } else if (name === 'houseType') {
      sethouseTypeSelected(value);
    }
    setroomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleImage(acceptedFiles) {
    setroomData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles],
    }));
  }

  const PageDisplay = () => {
    if (page === 0) {
      return <TitBhkOpt roomData={roomData} setroomData={setroomData} handleInput={handleInput} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />;
    } else if (page === 1) {
      return <GendRmsType roomData={roomData} setroomData={setroomData} handleInput={handleInput} genderSelected={genderSelected} setGenderSelected={setGenderSelected} BhkSelected={BhkSelected} setBhkSelected={setBhkSelected} />;
    } else if (page === 2) {
      return <AddAmen roomData={roomData} setroomData={setroomData} handleInput={handleInput} />;
    } else {
      return <PriceImg roomData={roomData} setroomData={setroomData} handleInput={handleInput} handleImage={handleImage} houseTypeSelected={houseTypeSelected} sethouseTypeSelected={sethouseTypeSelected} />;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('owner_pkey', user._id);
    formData.append('title', roomData.title);
    formData.append('address', roomData.address);
    formData.append('city', roomData.city);
    formData.append('state', roomData.state);
    formData.append('zipcode', roomData.zip);
    formData.append('description', roomData.description);
    formData.append('price', roomData.rent);
    formData.append('bhk', roomData.bhk);
    formData.append('sqft', roomData.sqft);
    formData.append('tenants', roomData.tenants);
    formData.append('room_option', roomData.roomOptions);
    formData.append('gender', roomData.gender);
    formData.append('room_type', roomData.houseType);
    formData.append('deposit', roomData.deposit);
    roomData.images.forEach((image, index) => {
      formData.append('roomImages', image);
    });

    try {
      const res = await axios.post('http://localhost:4000/api/v1/room/addroom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        setroomData({
          title: "",
          bhk: "",
          roomOptions: "",
          gender: "",
          houseType: "",
          address: "",
          city: "",
          state: "",
          zip: 0,
          description: "",
          tenants: 1,
          sqft: 0,
          deposit: 0,
          rent: 0,
          images: []
        });
        navigate("/profile");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error uploading room data: ", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="addroom">
      <div className="progressbar">
        <div style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%" }}></div>
      </div>
      <div className="addroomWrapper">
        <div className="addroomheader">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="addroom-body">
          {PageDisplay()}
        </div>
        <div className="addroom-foot">
          <button className="btn prev-btn" onClick={() => setPage((currPg) => currPg - 1)} disabled={page === 0}>Previous</button>
          {page === FormTitles.length - 1 ? (
            <button className="btn next-btn" style={{ backgroundColor: 'blue' }} onClick={handleSubmit}>Submit</button>
          ) : (
            <button className="btn next-btn" onClick={() => setPage((currPg) => currPg + 1)} disabled={page === FormTitles.length - 1}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addroom;
