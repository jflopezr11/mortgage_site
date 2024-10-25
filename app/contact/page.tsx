"use client";
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', message: '', number: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Continue with the form handling logic
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(formData.number)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    const hubspotPayload = {
      fields: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.number },
        { name: "message", value: formData.message }
      ]
    };

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/47856163/332c7c6f-be7f-4286-8da3-6d30208eba2d`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotPayload),
      }
    );

    if (response.ok) {
      alert('Form submitted successfully');
    } else {
      alert('There was an error submitting the form');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
      <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="border p-2 mb-4 rounded"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
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
          pattern="[0-9]{10}"
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

