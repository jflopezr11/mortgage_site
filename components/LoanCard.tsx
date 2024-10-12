"use client"; // Ensure this is marked as a client component

import { useState } from "react";

export default function LoanCard({ loanName, loanDescription }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-64 h-40 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Perspective is applied here for the 3D effect */}
      <div className="relative w-full h-full perspective">
        {/* Card container with 3D flipping */}
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of the card */}
          <div className="absolute w-full h-full bg-blue-500 text-white p-4 rounded-lg backface-visibility-hidden flex items-center justify-center transform rotate-y-0">
            <h3 className="text-xl font-bold">{loanName}</h3>
          </div>

          {/* Back of the card */}
          <div className="absolute w-full h-full bg-blue-700 text-white p-4 rounded-lg backface-visibility-hidden flex items-center justify-center transform rotate-y-180">
            <p className="text-sm">{loanDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}




