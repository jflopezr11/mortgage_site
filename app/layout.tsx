import "./globals.css";
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header Section */}
        <header className="bg-blue-900 text-white p-4">
          <nav className="flex justify-between items-center container mx-auto">
            <h1 className="text-xl font-bold">Joshua Lopez</h1>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-blue-300">
                  Mortgage Calculator
                </Link>
              </li>
            </ul>
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


