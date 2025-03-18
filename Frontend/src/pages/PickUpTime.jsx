import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import { useNavigate, useLocation } from 'react-router-dom';

const PickUpTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pickup, destination } = location.state || {};

  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [dateOption, setDateOption] = useState('Today');
  const [timeOption, setTimeOption] = useState('Now');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateOption(value);
    if (value !== 'Custom Date') {
      setCustomDate('');
    }
    if (value === 'Tomorrow' || value === 'Custom Date') {
      setTimeOption('Custom Time');
    } else {
      setTimeOption('Now');
    }
    setError('');
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTimeOption(value);
    if (value !== 'Custom Time') {
      setCustomTime('');
    }
    setError('');
  };

  const handleConfirm = () => {
    if (
      (dateOption === 'Custom Date' && !customDate) ||
      (timeOption === 'Custom Time' && !customTime)
    ) {
      setError('Please fill out all required fields.');
      return;
    }

    navigate("/choosevehicle", { state: { pickup, destination } });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/home')}
          className="text-lg cursor-pointer relative top-2 left-2"
          aria-label="Back"
        >
          <img src="/backButton.svg" alt="Back" className="w-6 h-6" />
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-2">When do you want to be picked up?</h1>

      <div className="space-y-4 mb-6">
        <div className="flex items-center border rounded-md p-3">
          <span className="w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
            </svg>
          </span>
          <select
            className="flex-1 ml-3 bg-transparent focus:outline-none"
            value={dateOption}
            onChange={handleDateChange}
          >
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Custom Date</option>
          </select>
        </div>

        {dateOption === 'Custom Date' && (
          <div className="flex items-center border rounded-md p-3 mt-2">
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
        )}

        {dateOption !== 'Tomorrow' && dateOption !== 'Custom Date' && (
          <div className="flex items-center border rounded-md p-3 mt-4">
            <span className="w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"></path>
              </svg>
            </span>
            <select
              className="flex-1 ml-3 bg-transparent focus:outline-none"
              value={timeOption}
              onChange={handleTimeChange}
            >
              <option>Now</option>
              <option>In 15 minutes</option>
              <option>Custom Time</option>
            </select>
          </div>
        )}

        {(dateOption === 'Tomorrow' || dateOption === 'Custom Date' || timeOption === 'Custom Time') && (
          <div className="flex items-center border rounded-md p-3 mt-2">
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="space-y-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center">
          <span className="w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.5895 16.0032L5.98291 7.39664L7.39712 5.98242L16.0037 14.589V7.00324H18.0037V18.0032H7.00373V16.0032H14.5895Z"></path>
            </svg>
          </span>
          <p>Choose your pick-up time up to 30 days in advance</p>
        </div>
        <div className="flex items-center">
          <span className="w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 2H20V6.45994L13.5366 12L20 17.5401V22H4V17.5401L10.4634 12L4 6.45994V2ZM12 10.6829L18 5.54007V4H6V5.54007L12 10.6829ZM12 13.3171L6 18.4599V20H18V18.4599L12 13.3171Z"></path>
            </svg>
          </span>
          <p>Extra wait time included to meet your ride</p>
        </div>
        <div className="flex items-center">
          <span className="w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <p>Cancel at no charge up to 60 minutes in advance</p>
        </div>
      </div>

      <a href="#terms" className="text-blue-600 underline text-sm block mb-6">
        See terms
      </a>

      <button 
        className="w-full bg-black text-white text-lg py-3 rounded-md hover:bg-blue-500"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default PickUpTime;