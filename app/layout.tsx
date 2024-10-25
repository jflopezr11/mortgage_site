"use client";
import { useState } from 'react';
import Link from 'next/link';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        {/* Meta Tags for SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Mortgage solutions for home buyers. Helping clients in all mortgage loan programs including FHA, VA, Conventional, and more." />
        <meta name="keywords" content="mortgage loans, home buying, FHA, VA loans, conventional loans, mortgage solutions" />
        <meta name="author" content="Joshua Lopez" />
        <meta name="robots" content="index, follow" />
        <title>Joshua Lopez - Mortgage Loan Officer</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="flex flex-col min-h-screen">
        {/* Header Section */}
        <header className="bg-blue-900 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Joshua Lopez</h1>

            {/* Mobile Hamburger Icon */}
            <div className="block sm:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden sm:flex space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-300">Home</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300">Contact</Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-blue-300">Mortgage Calculator</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-300">Visit My Blog</Link>
              </li>
            </ul>

            {/* Mobile Menu (Visible only when the hamburger is clicked) */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-300 block">Home</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-300 block">Contact</Link>
                </li>
                <li>
                  <Link href="/calculator" className="hover:text-blue-300 block">Mortgage Calculator</Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-300 block">Visit My Blog</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {/* Footer Section */}
        <footer className="bg-blue-900 text-white text-center p-4 mt-6">
          <p>© 2024 Joshua Lopez, NMLS #2230624. All rights reserved.</p>
          <p className="text-sm">
            Helping you navigate the mortgage process with confidence and clarity.
          </p>
        </footer>
      </body>
    </html>
  );
}
