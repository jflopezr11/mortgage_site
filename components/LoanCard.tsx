"use client";  // Client Component to enable interactivity
import { useState, useEffect } from 'react';

export default function LoanCard({ loanName, loanDescription }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to handle flipping the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Scroll-triggered animation logic
  useEffect(() => {
    const loanCards = document.querySelectorAll('.loan-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    loanCards.forEach(card => observer.observe(card));

    return () => {
      loanCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <div
      className="loan-card relative w-64 h-40 cursor-pointer"
      onClick={handleFlip}  // Enable flip on click
    >
      <div
        className={`relative w-full h-full transform-style preserve-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side of the Card */}
        <div
          className="absolute w-full h-full bg-blue-500 text-white p-4 rounded-lg backface-hidden flex items-center justify-center"
        >
          <h3 className="text-xl font-bold">{loanName}</h3>
        </div>

        {/* Back Side of the Card */}
        <div
          className="absolute w-full h-full bg-blue-700 text-white p-4 rounded-lg backface-hidden transform rotate-y-180 flex items-center justify-center"
        >
          <p className="text-sm">{loanDescription}</p>
        </div>
      </div>
    </div>
  );
}
