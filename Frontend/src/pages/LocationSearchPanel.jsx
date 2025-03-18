import React from 'react';

const LocationSearchPanel = ({ onLocationSelect }) => {
  const popularLocations = [
    { 
        name: "Rohtak",     
    },
    {
      name: "Indira gandhi international airport",
    },
    {
      name: "New Delhi Railway Station",
    },
    {
        name: "Sonipat",
    },
    
  ];

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-4">Popular Locations near you</h3>
      <ul className="grid grid-cols-2 gap-4">
        {popularLocations.map((location, index) => (
          <li key={index} className="border border-gray-200 rounded-md p-4">
            <button
              onClick={() => onLocationSelect(location.name)}
              className="w-full flex flex-col items-center"
            >
              
              <p className="text-center text-gray-700">{location.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearchPanel;