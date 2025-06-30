"use client";

import { useState } from "react";

export default function RentVsOwnLandingPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formComplete, setFormComplete] = useState(false);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.includes("@") &&
    formData.phone.trim().length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // TODO: Send data to backend or marketing platform
      setFormComplete(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Rent vs Own: What’s Actually Smarter?
      </h1>
      <p className="text-center max-w-xl text-gray-700">
        We'll show you how buying compares to renting — but first, let us know
        who you are so we can personalize your experience.
      </p>

      {/* Your Sanity-managed content will eventually go here */}

      {!formComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Before You Continue</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  className="w-full border p-2 rounded"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full p-2 rounded text-white ${
                  isFormValid ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400"
                }`}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
