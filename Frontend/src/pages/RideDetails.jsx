import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

const RideDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);

  const [message, setMessage] = useState("");

  const { ride, pickup, destination, passengername, mobile, etas } =
    location.state || {};
 

  if (!ride) {
    navigate("/home", { replace: true });
    return null;
  }

  const handleSend = () => {
    if (message.trim()) {
      // console.log("Message sent:", message);
      setMessage("");
    } else {
      console.log("No message to send");
    }
  };

  useEffect(() => {
    if (window.google && pickup && destination) {
      if (!directionsService.current) {
        directionsService.current = new window.google.maps.DirectionsService();
      }
      if (!directionsRenderer.current) {
        directionsRenderer.current = new window.google.maps.DirectionsRenderer();
      }
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: { lat: 28.7041, lng: 77.1025 },
      });

      directionsRenderer.current.setMap(map);

      const request = {
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.current.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.current.setDirections(result);
        } else {
          console.error(`Error fetching directions: ${result}`);
        }
      });
    }
  }, [pickup, destination]);

  return (
    <div className="h-screen flex flex-col">
      {/* Map Section */}
      <div className="flex-grow relative">
        <h1 className="absolute top-16 right-5 text-2xl font-bold text-black z-50">
          MOKSH
        </h1>

        <Logout />
        <div ref={mapRef} className="absolute inset-0 bg-gray-200"></div>
      </div>

      {/* Ride Details */}
      <div className="overflow-y-auto max-h-[75%] bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Meet at the Pickup Point</h2>
          <span className="text-lg font-semibold bg-red-500 text-white px-3 py-1 rounded-md">
            2 min
          </span>
        </div>
        <hr className="border-t border-gray-400 my-4" />
        
        <div className=" flex-wrap justify-around">
          <div className="text-center flex flex-col items-start">
            <h3 className="font-extrabold text-gray-800 text-lg">
              Passenger Details
            </h3>
            <p className="text-gray-600 font-bold flex items-start justify-normal">{passengername}</p>
            <p className="text-gray-500 font-medium flex items-start justify-normal">{mobile}</p>
          </div>
          <div className="text-center flex flex-col items-end">
            <h3 className="font-extrabold text-gray-800 text-lg">
              Driver Details
            </h3>
            <p className="text-gray-600 font-bold flex flex-col items-end">Sunny jangra</p>
            <p className="text-gray-500 font-semibold">Vehicle Type: Sedan</p>
            <p className="text-gray-500 font-semibold">Ratings: 4.9</p>
          </div>
        </div>
        <div className="flex justify-around mt-8">
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
              🛡️
            </div>
            <span className="mt-4 text-sm">Safety</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
              📤
            </div>
            <span className="mt-2 text-sm">Share my trip</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
              📞
            </div>
            <span className="mt-2 text-sm">Call driver</span>
          </button>
        </div>
        <div className="mt-4 bg-blue-300 px-4 py-2 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-2">Arriving at: {pickup}</h2>
          <p className="text-gray-800">Estimated time : {etas}</p>
          <p className="text-gray-500">Destination: {destination}</p>
        </div>

        {/* Message Input */}
        <div className="mt-4 flex items-center bg-slate-200 rounded-md shadow-lg p-3">
          <input
            className="flex-grow bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 px-3"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
          />
          <button
            onClick={handleSend}
            aria-label="Send Message"
            className="p-2 bg-blue-500 rounded-md flex items-center justify-center text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0L15 7.5m4.5 4.5L15 16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
