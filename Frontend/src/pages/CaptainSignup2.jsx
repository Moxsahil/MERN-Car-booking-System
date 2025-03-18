import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CaptainSignup2 = () => {
  const [vehicleColor, setVehicleColor] = useState('');
  const [ vehicleNo, setVehicleNo ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [captainData, setCaptainData] = useState({});
  const [ vehicleType, setVehicleType ] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
        vehicleColor: vehicleColor,
        vehicleNo: vehicleNo,
        vehicleCapacity: vehicleCapacity,
        vehicleType: vehicleType
    });

    setVehicleColor('');
    setVehicleNo('');
    setVehicleCapacity('');
    setVehicleType('');

  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-green-300 p-4">
      <div className="flex flex-col items-center mt-10">
        <form onSubmit={submitHandler}>
          <h1 className="text-lg font-semibold mb-4">Hello Captain,</h1>
          <h1 className="text-lg font-semibold mb-4">Enter Your Vehicle Details</h1>

          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm bg-blue-500">
            <div className="flex items-center px-3">
              <span className="text-sm">Vehicle Color</span>
            </div>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              placeholder="Enter your vehicle color"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <div className="bg-blue-500 flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm">
            <div className="flex items-center px-3">
              <span className="text-sm">Vehicle No.</span>
            </div>
            <input
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              type="text"
              placeholder="Enter your vehicle no."
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm bg-blue-500">
            <div className="flex items-center px-3">
              <span className="text-sm">Capacity</span>
            </div>
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type="text"
              placeholder="Enter capacity"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm bg-blue-500">
            <div className="flex items-center px-3">
              <span className="text-sm">Vehicle Type</span>
            </div>
            <input
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              type="text"
              placeholder="Car/Bus/Bike"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg font-medium mb-4 max-w-sm hover:bg-white hover:text-black transition-all duration-300">
            Sign Up
          </button>
        </form>

        <div className="text-center text-gray-500 text-sm mb-4 max-w-sm">or</div>
        <div className="w-full flex flex-col gap-2 max-w-sm">
          <Link
            to="/captainlogin"
            className="bg-orange-500 flex items-center justify-center border py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Already have an account
            <img src="already.svg" alt="Already" className="w-5 h-5 mr-2" />
          </Link>
        </div>
      </div>

      <div className="text-xs text-gray-500 justify-center mt-4 py-4">
        <p>
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from MOX and its affiliates to the
          number provided.
        </p>
        <p className="mt-2 justify-center">
          This site is protected by reCAPTCHA and the Google
          <a href="#" className="text-blue-500 underline ml-1">Privacy Policy</a> and
          <a href="#" className="text-blue-500 underline ml-1">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup2;
