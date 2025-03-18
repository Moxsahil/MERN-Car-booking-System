import React from "react";
import { Link } from "react-router-dom";

const StartingScreen = () => {
  return (
    <div
      className="w-full h-screen flex flex-col justify-between overflow-hidden"
      style={{
        backgroundImage: "url('./mainscreen.webp')", // Default image for large screens
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* For small screens (sm and below), use a different image */}
      <div className="sm:hidden" style={{ backgroundImage: "url('./mainscreen.webp')" }}>
        {/* Small screen content */}
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 absolute top-8 left-0">
        <h1 className="text-white text-3xl font-bold w-44 h-auto">MOKSH</h1>
      </header>

      <main className="flex-1 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4">
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white px-6 py-8 rounded-t-3xl shadow-lg">
        <h2 className="text-gray-900 text-xl font-semibold mb-4">
          Get started with MOKSH
        </h2>
        <Link
          to="/login"
          className="bg-black text-white w-full py-4 rounded-lg text-lg font-medium flex items-center justify-center hover:bg-gray-800 transition"
        >
          Continue <span className="ml-2 text-xl">→</span>
        </Link>
      </footer>
    </div>
  );
};

export default StartingScreen;
