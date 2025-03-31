"use client";

import LoanCard from '@/components/LoanCard';  // Adjusted path to point to the correct folder
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import the Next.js Link component
import Head from 'next/head';



export default function Home() {

  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroSection?.classList.add('animate'); // Add the 'animate' class when in view
        } else {
          heroSection?.classList.remove('animate'); // Optionally remove if out of view
        }
      });
    });

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    "name": "Joshua Lopez - Mortgage Specialist",
    "url": "https://www.joshualopezloans.com",
    "logo": "https://www.yourwebsite.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-323-762-9786",
      "contactType": "Customer Service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90001",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.facebook.com/joshuathemlo",
      "https://www.linkedin.com/in/yourprofile"
    ]
  };


  return (
    <>
      <Head>
        <title>Joshua Lopez - Mortgage Specialist | NMLS #2230624</title>
        <meta name="description" content="Helping you navigate the mortgage process with confidence and clarity." />
        <meta name="keywords" content="homeloans near me,mortgage, loans, refinance, home buying, VA loan, FHA loan, conventional loan, buying a home" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Head>
      <div>
        <main className="hero-section flex flex-col items-center justify-center h-screen text-center bg-blue-100  pb-8 gap-10"> {/* Decreased bottom margin */}
          <div className="relative mb-8 md:mb-0 md:mr-12 animate-fade-in">
            <div className="absolute inset-0 rounded-2xl bg-blue-300 blur-xl opacity-30 -z-10"></div>
            <div className="w-60 h-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:scale-105 transition-transform duration-300">
              <img
                src="/pictures/joshua_headshot.jpg"
                alt="Joshua Lopez"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-80">
              ✅ FHA Specialist
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-80">
              💬 Se Habla Español
            </span>
            <span className="bg-sky-800 text-white-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-80">
              🏠 First-Time Buyer Friendly
            </span>
          </div>



          <div className="max-w-xl animate-fade-in delay-150">
            <h1 className="text-5xl font-bold mb-4 text-blue-900">Welcome! I’m Joshua Lopez, NMLS #2230624</h1>
            <p className="text-lg text-blue-700 mb-6">Helping you navigate the mortgage process with confidence and clarity.</p>

            <Link href="/contact"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105">
              Get in Touch Today
            </Link>
          </div>
        </main>


        <main className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 pt-8">
          <h1 className="text-4xl font-bold mb-6">Loan Programs I Work With</h1>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2 w-full max-w-8xl">
            {/* Adjusted grid for medium screens */}
            <LoanCard
              loanName="Conventional Loan"
              loanDescription="A mortgage loan that is not backed by a government agency. Ideal for borrowers with good credit and a stable income."
            />
            <LoanCard
              loanName="FHA Loan"
              loanDescription="Backed by the Federal Housing Administration, this loan is popular among first-time homebuyers with low down payment options."
            />
            <LoanCard
              loanName="VA Loan"
              loanDescription="Available to veterans and active-duty service members, offering benefits like no down payment and no mortgage insurance."
            />
            <LoanCard
              loanName="Down Payment Assistance"
              loanDescription="Finance all of your down payment and closing cost. Out pocket cost minimal"
            />
            <LoanCard
              loanName="Jumbo"
              loanDescription="A mortgage that exceeds conforming loan limits designed for borrowers with higher incomes and strong credit who need to finance properties beyond standard loan caps."
            />
            <LoanCard
              loanName="Non QM"
              loanDescription="Designed for borrowers with irregular income or self-employed individuals. It’s ideal for borrowers who don't fit the standard guidelines for conventional loans but still have the means to repay"
            />
            <LoanCard
              loanName="Mobile/manufactured"
              loanDescription="It's for buyers purchasing mobile or manufactured homes, with or without land, offering a more affordable housing option than traditional homes."
            />
            <LoanCard
              loanName="Down Payment Assistance"
              loanDescription="For borrowers who have an Individual Taxpayer Identification Number (ITIN) instead of a Social Security number. It’s typically used by non-U.S. citizens"
            />
            <LoanCard
              loanName="Home Equity Line of Credit"
              loanDescription="a revolving credit line secured by your home's equity, allowing you to borrow funds as needed up to a set limit."
            />
            <LoanCard
              loanName="ITIN"
              loanDescription="An ITIN loan is a mortgage for borrowers with an Individual Taxpayer Identification Number, typically non-U.S. citizens without Social Security numbers,"
            />

          </section>
        </main>
      </div>
    </>
  );
}




