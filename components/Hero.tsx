'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const heroSection = sectionRef.current;
    if (!heroSection) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroSection.classList.add('opacity-100');
        } else {
          heroSection.classList.remove('opacity-100');
        }
      });
    });
  
    observer.observe(heroSection);
    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);
  

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#CCE7FF] to-[#F0EAD9] flex flex-col items-center justify-start min-h-screen px-6 py-16 gap-8 text-center transition-opacity duration-1000 opacity-0 will-change-opacity">
        
      {/* Headshot */}
      <div className="w-48 sm:w-56 md:w-60 lg:w-64 xl:w-72 rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:scale-105 transition-transform duration-300 ring-2 ring-offset-4 ring-blue-300">
        <img
          src="/pictures/joshua_headshot.jpg"
          alt="Joshua Lopez"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-80">
          ✅ FHA Specialist
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-80">
          💬 Se Habla Español
        </span>
        <span className="bg-sky-800 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-80">
          🏠 First-Time Buyer Friendly
        </span>
      </div>

      {/* Text */}
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
          Welcome! I’m Joshua Lopez,  <br className="hidden md:block" /> NMLS #2230624
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Helping you navigate the mortgage process with confidence and clarity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base">
            Get in Touch Today
          </Link>
        <Link
          href="/loan"
          className="inline-block px-6 py-3 bg-blue-900 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base">
            Want a pre-approval?
          </Link>
        </div>
      </div>
    </section>
  );
}