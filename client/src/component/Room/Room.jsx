import React, { useState, useContext, useEffect } from "react";
import "./Room.css";
import Roomcard from "../Roomcard/Roomcard";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "0", max: "2000" });
  const [bhkFilter, setBhkFilter] = useState("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateStaticData = () => {
    const newLocationOptions = [...new Set(rooms.map((room) => room.address))];
    const newBhkOptions = [...new Set(rooms.map((room) => room.bhk.toString()))];
    setLocationOptions(newLocationOptions);
    setBhkOptions(newBhkOptions);
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/room/");
      if (response && response.data) {
        setRooms(response.data.data);
        setFilteredData(response.data.data.filter((item) => item.owner_pkey !== user._id));

        toast.success("Fetched Rooms Successfully");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error(`Error fetching rooms : ${error}`);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filterData = () => {
    const filtered = rooms.filter((room) => {
      const titleMatch = room.title && room.title.toLowerCase().includes(searchQuery.toLowerCase());

      const locationMatch = !locationFilter || (room.address && room.address.toLowerCase().includes(locationFilter.toLowerCase()));

      const minPrice = parseFloat(priceRange.min);
      const maxPrice = parseFloat(priceRange.max);
      const priceMatch = (!priceRange.min || (room.price && room.price >= minPrice)) && (!priceRange.max || (room.price && room.price <= maxPrice));

      const bhkMatch = !bhkFilter || (room.bhk && room.bhk.toString() === bhkFilter);

      return titleMatch && locationMatch && priceMatch && bhkMatch;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
    updateStaticData();
  }, [searchQuery, locationFilter, priceRange, bhkFilter, rooms]);

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setPriceRange({ min: "", max: "" });
    setBhkFilter("");
    setFilteredData(rooms);
  };

  const handleCardClick = (r) => {
    console.log(r);
  };

  return (
    <div className="room">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          className="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <ToastContainer />
          <select
            className="minimal"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Location</option>
            {locationOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            className="minimal"
            value={bhkFilter}
            onChange={(e) => setBhkFilter(e.target.value)}
          >
            <option value="">BHK</option>
            {bhkOptions.map((bhk, index) => (
              <option key={index} value={bhk}>
                {`${bhk}`}
              </option>
            ))}
          </select>
          <span className="priceRange">
            Price Range:
            <input
              className="minimal"
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <input
              className="minimal"
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </span>
        </div>
        <button id="nofilter" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      <div className="roomWrapper">
        <div className="roomCards">
          {filteredData.map((r, index) => (
            <Roomcard key={index} {...r} onClick={() => handleCardClick(r)} />
          ))}
        </div>
      </div>
    </div>
  );
}
