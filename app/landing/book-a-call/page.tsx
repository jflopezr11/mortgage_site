'use client';

import { useEffect } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    hbspt: any;
  }
}


export default function BookACallPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '47856163',
          formId: '7b03551b-8043-4e23-bc8e-f853938ba005',
          target: '#hubspotForm',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-6 flex flex-col items-center text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          Book a Free Call with Joshua
        </h1>
        <p className="text-lg text-blue-700 mb-10">
          I’m Joshua Lopez, a licensed Loan Officer specializing in helping homebuyers
          and homeowners find the right loan with clarity and confidence.
        </p>
        <p className="text-md text-blue-600">
          Fill out the form below and I’ll personally reach out to help you get started.
        </p>


        {/* Image Section */}
        <div className="flex justify-center my-10 ">
          <Image
            src="/pictures/outsideHeadshot.jpg"
            alt="Joshua Lopez headshot"
            width={400}
            height={400}
            className="rounded-xl shadow-lg border-4 border-blue-900 max-w-full h-auto"
          />
        </div>


        <div id="hubspotForm" className="w-full" />

        <a
          href="sms:6267228876?&body=Hi%20Josh%2C%20I%27m%20interested%20in%20getting%20prequalified!"
          className="block md:hidden mt-8 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
        >
          📱 Text Joshua Now
        </a>


        <noscript>
          <p className="text-red-500 mt-4">
            You must enable JavaScript to fill out this form.
          </p>
        </noscript>
      </div>
    </div>
  );
}