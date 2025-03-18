import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../components/Logout";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { ride, ridePrices, pickup, destination, etas } = location.state || {};
  const [passengername, setPassengername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');


  if (!ride) {
    navigate("/home", { replace: true });
    return null;
  }

  const handlePayment = async () => {
    if (!passengername.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!mobile.trim()) {
      toast.error("Please enter your mobile number.");
      return;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    } 
    try {
      const amountInPaise = Number(ridePrices);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: amountInPaise,
            currency: "INR",
          }),
      });
      console.log("ridePrices value before sending:", ridePrices);

      console.log(response);
      console.log(data);
      const data = await response.json();
      handlePaymentVerify(data.data);

      if (response.ok) {
        toast.success("Payment initiated successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed. Please try again.");
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(parseFloat(ridePrices) * 100),
          
          currency: "INR",
        }),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${data.message || "Payment failed"}`);
      }
    
      console.log("Payment initiated successfully:", data);
      handlePaymentVerify(data.data);
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error(err.message);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MOKSH Travel",
      description: "Test Payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
            navigate("/ridedetails", { state: { ride, pickup, destination, passengername, mobile, etas }, replace:true });
          }
        } catch (err) {
          console.error(err);
          toast.error("Payment verification failed. Please try again.");
        }
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="h-screen bg-white p-4 mt-4">
      
      <ToastContainer  position="top-right" theme="dark" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <header className="text-center text-xl font-semibold mb-6">Payment Page </header>
      <Logout />

      <div className="bg-red-500 rounded-lg p-6 shadow-md mb-8 flex items-center">
        <img src={ride.image} alt={ride.name} className="w-20 h-20 mt-2 mr-4"/> 
        <div className="flex-grow text-right">
          <div className="text-sm font-medium text-white">Selected Ride</div>
          <div className="text-lg font-bold mt-2 text-white">{ride.name}</div>
          <div className="text-lg text-white">Capacity: {ride.capacity}</div>
          <div className="text-lg text-white">Price: ₹{parseFloat(ridePrices).toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-blue-400 rounded-lg p-6 shadow-md mb-6">
        <div className="text-2xl font-extrabold text-gray-700 mb-4">Passenger Details:-</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 rounded-lg" htmlFor="name">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            required
            value={passengername}
            onChange={(e) => setPassengername(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
            Age:
          </label>
          <input
            type="number"
            id="age"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
            Mobile No
          </label>
          <input
            type="number"
            id="mobile"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email(optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 gap-3 rounded bg-white p-4 w-full">
        <button
          onClick={handlePayment}
          // onClick={() => {
          //   console.log("Payment initiated.");
          // }}
          className="bg-black text-white px-3 py-3 rounded-lg w-full hover:bg-blue-500"
        >
          Confirm and Pay<span></span>
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
