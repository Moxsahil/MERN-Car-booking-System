import React, { useState, useEffect, useRef } from "react";

const LocationSearchPanel = ({ onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteService = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps JavaScript API is not loaded.");
      return;
    }
    if (!autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "" || !autocompleteService.current) {
      setSuggestions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      { input: query },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions || []);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.description);
    setSuggestions([]);
    onLocationSelect(suggestion.description); // Pass the selected location to the parent component
  };

  return (
    <div className="w-full h-full p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Search Locations</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a location"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
      <ul className="mt-4 border-t">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearchPanel;
