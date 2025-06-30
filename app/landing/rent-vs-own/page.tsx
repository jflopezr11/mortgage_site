"use client";

import { useState } from "react";
import RentVsOwnCalculator from "@/components/RentVsOwnCalculator";
import { useForm, ValidationError } from '@formspree/react';
import { useEffect } from "react";
import Image from 'next/image';

export default function RentVsOwnLandingPage() {
  const [formComplete, setFormComplete] = useState(true);
  const [state, handleSubmit] = useForm("xpwrbyzz");

  useEffect(() => {
    if (state.succeeded) {
      setFormComplete(true)
    }
  }, [state.succeeded]);


  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="min-h-auto bg-white py-12 px-6 flex flex-col rounded-xl shadow-lg border-4 border-blue-900 items-center text-center">
        <div className="max-w-2xl">
          <div className="mb-6">
            <Image
              src="/pictures/GOTLogo.png"
              alt="GOT Mortgage Solutions logo"
              width={160}
              height={50}
              className="mx-auto"
            />
          </div>

          <div className="flex justify-center my-10">
            <Image
              src="/pictures/JLWebCard.png"
              alt="Joshua Lopez headshot"
              width={400}
              height={400}
              className="rounded-xl shadow-lg border-4 border-blue-900 w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
            />
          </div>
          <h1 className="text-2xl">Joshua Lopez NMLS#2230624 </h1>
        </div>
      </div>


      {!formComplete && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Rent vs Own Calculator</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border p-2 rounded"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
              >
                {state.submitting ? "Submitting..." : "Show Me the Calculator"}
              </button>
            </form>
          </div>
        </div>
      )}


      {formComplete && (
        <>
          <h1 className="text-3xl font-bold text-center mb-4 pt-6">
            Rent vs Own: What’s Actually Smarter?
          </h1>
          <p className="text-center max-w-xl text-gray-700 ">
            I will show you how buying compares to renting — here's your calculator:
          </p>
          <div className="mt-8 w-full max-w-4xl overflow-x-auto px-2">
            <RentVsOwnCalculator howItWorksContent={null} />

          </div>
        </>
      )}
    </div>
  );
}
