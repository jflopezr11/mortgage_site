"use client";

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', number: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation for the phone number
    const phoneNumberPattern = /^[0-9]{10}$/;  // Ensures 10 digits only
    if (!phoneNumberPattern.test(formData.number)) {
      alert('Please enter a valid 10-digit phone number');
      return;  // Prevent form submission
    }


    console.log('Form data:', formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
      <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}> {/* Adjusted width */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 mb-4 rounded"
        />
        <input
          type="tel"
          name="number"
          placeholder="Your Number"
          value={formData.number}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"  // Ensures a 10-digit number
          title="Please enter a valid 10-digit phone number"
          className="border p-2 mb-4 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 mb-4 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="border p-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
