"use client";  // Client Component to enable interactivity
import { useState } from 'react';

export default function LoanCard({ loanName, loanDescription }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-64 h-40 cursor-pointer"
      onClick={handleFlip}  // Enable flip on click
    >
      <div className="relative w-full h-full transform-style preserve-3d transition-transform duration-500" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {/* Front Side of the Card */}
        <div
          className="absolute w-full h-full bg-blue-500 text-white p-4 rounded-lg backface-hidden flex items-center justify-center"
          style={{ transform: 'rotateY(0deg)' }}  // Front should always be upright
        >
          <h3 className="text-xl font-bold">{loanName}</h3>
        </div>

        {/* Back Side of the Card */}
        <div
          className="absolute w-full h-full bg-blue-700 text-white p-4 rounded-lg backface-hidden flex items-center justify-center"
          style={{ transform: 'rotateY(180deg)' }}  // Back should be rotated 180 degrees
        >
          <p className="text-sm">{loanDescription}</p>
        </div>
      </div>
    </div>
  );
}






