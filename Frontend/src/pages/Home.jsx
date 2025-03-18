import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Logout from "../components/Logout";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });

  const panelRef = useRef(null);
  const formRef = useRef(null);
  const panelCloseRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const map = useRef(null);
  const marker = useRef(null);

  const handleLogout = async () => {
    navigate("/user/logout");
  };

  const handleLocationSelect = (location) => {
    if (pickup === "") {
      setPickup(location);
    } else {
      setDestination(location);
    }
    setPanelOpen(false);
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "61%",
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(formRef.current, {
        y: "-180%",
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(formRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [panelOpen]);

  

  const handleButtonClick = () => {
    if (pickup && destination) {
      navigate("/pickuptime", { state: { pickup, destination } });
    } else {
      toast("Please fill in both Pickup and Destination fields.");
    }
  };

  const initMap = (lat, lng) => {
    if (mapRef.current) {
      if (!map.current) {
        map.current = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
        });

        marker.current = new window.google.maps.Marker({
          position: { lat, lng },
          map: map.current,
          title: "Your current location",
        });
      } else {
        map.current.setCenter({ lat, lng });
        marker.current.setPosition({ lat, lng });
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();

            if (data.status === "OK") {
              const city =
                data.results[0]?.address_components?.find((component) =>
                  component.types.includes("locality")
                )?.long_name;

              setPickup(city || "Your location");
              initMap(latitude, longitude);
            } else {
              console.error("Geocode API error:", data.status);
              alert("Could not detect your location. Geocode API returned an error.");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            alert("Could not fetch the location from the geocode API. Please try again.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Geolocation permission denied. Please enable location access.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Location unavailable. Please try again later.");
          } else if (error.code === error.TIMEOUT) {
            alert("Geolocation request timed out. Please try again.");
          } else {
            alert("An unknown error occurred while retrieving your location.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setPickup("Your location");

          initMap(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      initMap(currentLocation.lat, currentLocation.lng);
    }
  }, [currentLocation]);

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100 relative overflow-hidden">

    <ToastContainer  position="top-right" theme="dark" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <Logout />

      <div ref={mapRef} className="w-full h-2/3 bg-gray-300 relative"></div>

      <div
        ref={formRef}
        className="w-full h-1/3 bg-white flex flex-col items-center px-4 relative transition-all duration-500 ease-in-out"
      >
        <h5
          ref={panelCloseRef}
          onClick={() => setPanelOpen(false)}
          className="mt-4 absolute top-5 right-5 text-2xl font-bold"
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </h5>
        <h2 className="text-lg font-semibold my-4">Find a trip</h2>

        <div className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="pickup" className="block text-gray-600 text-sm mb-2">
              Pick-up Location
            </label>
            <div className="flex">
              <input
                id="pickup"
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                type="text"
                placeholder="Add a pick-up location"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={handleUseCurrentLocation}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Use Current Location
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-gray-600 text-sm mb-2"
            >
              Destination
            </label>
            <input
              id="destination"
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            onClick={handleButtonClick}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Choose Vehicle
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        className="panel bg-white w-full absolute bottom-0 left-0"
        style={{ height: "0%", overflow: "hidden" }}
      >
        <LocationSearchPanel onLocationSelect={handleLocationSelect} />
      </div>
    </div>
  );
};

export default Home;
