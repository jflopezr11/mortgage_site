"use client";
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
    number: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(formData.number)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    const hubspotPayload = {
      fields: [
        { name: 'firstname', value: formData.firstname },
        { name: 'lastname', value: formData.lastname },
        { name: 'email', value: formData.email },
        { name: 'phone', value: formData.number },
        { name: 'message', value: formData.message },
      ],
    };

    const response = await fetch(
      'https://api.hsforms.com/submissions/v3/integration/submit/47856163/332c7c6f-be7f-4286-8da3-6d30208eba2d',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotPayload),
      }
    );

    if (response.ok) {
      alert('Form submitted successfully');
    } else {
      alert('There was an error submitting the form');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-white">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg p-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-[#004AAD] mb-8">
          Get in Touch
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
            />
          </div>
          <input
            type="tel"
            name="number"
            placeholder="Your Number"
            value={formData.number}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAD]"
          />
          <button
            type="submit"
            className="w-full bg-[#004AAD] text-white py-3 rounded-lg font-semibold hover:bg-[#003080] transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}