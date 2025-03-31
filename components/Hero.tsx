"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-100 text-center">
      <div className="flex flex-col items-center justify-start min-h-screen pt-32 pb-10 gap-10">

        {/* Headshot w/ glow */}
        <div className="relative w-60 animate-fade-in">
          <div className="absolute inset-0 rounded-2xl bg-blue-300 blur-xl opacity-30 -z-10"></div>
          <div className="relative w-60 h-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:scale-105 transition-transform duration-300 z-10">
            <img
              src="/pictures/joshua_headshot.jpg"
              alt="Joshua Lopez"
              className="object-cover w-full h-full"
            />
          </div>
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
        <div className="max-w-xl animate-fade-in delay-150 px-4">
          <h1 className="text-5xl font-bold mb-4 text-blue-900">
            Welcome! I’m Joshua Lopez, NMLS #2230624
          </h1>
          <p className="text-lg text-blue-700 mb-6">
            Helping you navigate the mortgage process with confidence and clarity.
          </p>

          <Link href="/contact"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Get in Touch Today
          </Link>
        </div>

      </div>
    </section>
  );
}
