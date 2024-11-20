import React, { useState, useEffect } from "react";

const Preloader = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "One stop for all your food cravings!",
    "Loading resources...",
    
    "Tasty dishes on your way...",
    
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Update message every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-400 to-orange-600">
      <h1 className="text-6xl font-extrabold text-white animate-bounce mb-4">
        Flavoro
      </h1>
      <p
        className={`text-lg text-white font-medium transition-opacity duration-500 ${
          messageIndex % 2 === 0 ? "opacity-100" : "opacity-50"
        }`}
      >
        {messages[messageIndex]}
      </p>
      <div className="mt-6 flex justify-center">
        <div className="w-12 h-12 border-4 border-t-green-300 border-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Preloader;
