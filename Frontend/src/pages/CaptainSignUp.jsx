import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captainData, setCaptainData] = useState({});
  const navigate = useNavigate(); 

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    setEmail('');
    setPassword('');
    setConfirmPassword('');

    navigate('/CaptainSignup2');
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-green-300 p-4">
      <div className="flex flex-col items-center mt-10">
        <form onSubmit={submitHandler}>
          <h1 className="text-lg font-semibold mb-4">Hello Captain,</h1>
          <h1 className="text-lg font-semibold mb-4">Create Your Account</h1>

          <div className="bg-blue-500 flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm">
            <div className="flex items-center  px-3">
              <span className="text-sm">First Name</span>
            </div>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder="Enter your first name"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          {/* Last Name Field */}
          <div className="bg-blue-500 flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm">
            <div className="flex items-center  px-3">
              <span className="text-sm">Last Name</span>
            </div>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder="Enter your last name"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm bg-blue-500">
            <div className="flex items-center px-3">
              <span className="text-sm">E-mail</span>
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <div className="bg-blue-500 flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm">
            <div className="flex items-center px-3">
              <span className="text-sm">Password</span>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm bg-blue-500">
            <div className="flex items-center px-3">
              <span className="text-sm">Confirm Password</span>
            </div>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              type="password"
              placeholder="Confirm your password"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg font-medium mb-4 max-w-sm hover:bg-white hover:text-black transition-all duration-300">
            Next
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

export default CaptainSignUp;
