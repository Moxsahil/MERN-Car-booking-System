import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VehicleScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pickup, destination } = location.state || {};
  const mapRef = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);

  const handleLogout = async () => {
    navigate("/user/logout");
  };

  const [selectedRide, setSelectedRide] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [etas, setEtas] = useState([]);
  const [ridePrices, setRidePrices] = useState([])

  const rides = [
    {
      name: "CityFast",
      capacity: 4,
      time: "2 mins away",
      description: "Affordable, compact rides",
      basePrice: 300,
      image: "https://www.svgrepo.com/show/408293/car-black.svg",
    },
    {
      name: "Moto",
      capacity: 1,
      time: "3 mins away",
      description: "Affordable motorcycle rides",
      basePrice: 100,
      image: "https://www.svgrepo.com/show/101451/racing-motorbike.svg",
    },
    {
      name: "Premier",
      capacity: 4,
      time: "4 mins away",
      description: "Comfortable buses, for long journeys",
      basePrice: 40,
      image: "https://www.svgrepo.com/show/278837/bus.svg",
    },
    {
      name: "Auto",
      capacity: 3,
      time: "2 mins away",
      description: "Affordable auto rides",
      basePrice: 0,
      image: "https://www.svgrepo.com/show/22504/auto-ricksaw.svg",
    },
  ];

  const handleRideClick = (ride) => {
    const selectedRideIndex = rides.findIndex((r) => r.name === ride.name);
    const selectedEta = etas[selectedRideIndex];
    setSelectedRide(ride.name);
    navigate('/paymentpage', { state: { ride, pickup, destination, ridePrices: ridePrices[selectedRideIndex], etas: selectedEta } });
  };

  const calculatePrice = (distanceInKm, basePrice) => {
    let pricePerKm;
    if(distance <= 100){
      pricePerKm = 5;
    } else if(distance <= 200){
      pricePerKm = 10;
    } else {
      pricePerKm = 15;
    }
     return distanceInKm * pricePerKm + basePrice;
  }

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
        center: { lat: 28.8955165, lng: 76.5710154 },
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
          const route = result.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);

          const distanceInKm = parseFloat(route.distance.text.replace(' km', ''));

          
          const newEtas = rides.map(() => {
            const randomMinutes = Math.floor(Math.random() * 6) + 10;
            const etaDate = new Date(Date.now() + randomMinutes * 60000);
            const etaHours = etaDate.getHours().toString().padStart(2, '0');
            const etaMinutes = etaDate.getMinutes().toString().padStart(2, '0');
            return `${etaHours}:${etaMinutes}`;
          });
          setEtas(newEtas);

          const newRidePrices = rides.map( ride => {
            return calculatePrice(distanceInKm, ride.basePrice).toFixed(2);
          });
          setRidePrices(newRidePrices);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  }, [pickup, destination]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow relative">
        <h1 className="absolute top-16 right-5 text-2xl font-bold text-black z-50">MOKSH</h1>

        <div className="absolute top-5 right-5 flex items-center z-50">
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
          >
            <img
              src="https://www.svgrepo.com/show/529288/user-minus.svg"
              alt="Logout Icon"
              className="w-6 h-6 mr-2"
            />
            Logout
          </button>
        </div>
        <div ref={mapRef} className="absolute inset-0 bg-gray-200"></div>
      </div>

      <div className="bg-white px-4 py-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Route Details</h2>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
        <div className="space-y-4">
          {rides.map((ride, index) => (
            <div
              key={index}
              onClick={() => handleRideClick(ride)}
              className={`bg-blue-400 flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-400 ${
                selectedRide === ride.name
                  ? 'border-gray-900 bg-gray-100'
                  : 'border-gray-300 hover:border-gray-700 hover:text-white'
              }`}
            >
              <img
                src={ride.image}
                alt={ride.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{ride.name}</h3>
                  <span>₹{ridePrices[index]}</span>
                </div>
                <div className="text-sm text-gray-500 font-bold">
                  {ride.time} • ETA: {etas[index]}
                </div>
                <div className="text-sm">{ride.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleScreen;