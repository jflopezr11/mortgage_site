import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import LoanProgramsSection from '@/components/LoanProgramsSection'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: "Home | Josh Lopez Loans",
  description: "Helping you find the perfect loan for your dream home. Personalized loan programs and expert guidance.",
  openGraph: {
    title: "Josh Lopez Loans",
    description: "Helping you find the perfect loan for your dream home.",
    url: "https://joshualopezloans.com",
    siteName: "Josh Lopez Loans",
    images: [
      {
        url: "https://joshualopezloans.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};


export default function Home() {
  return (
    <>
      <Head>
        <title>Joshua Lopez - Mortgage Specialist | NMLS #2230624</title>
        <meta name="description" content="Helping you navigate the mortgage process with confidence and clarity." />
        <meta name="keywords" content="homeloans near me, mortgage, loans, refinance, VA loan, FHA loan" />
      </Head>

      <main className="bg-gradient-to-br from-[#E0F0FF] to-[#F9F5EF]">
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="relative backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100 bg-gradient-to-br from-[#CCE7FF] to-[#F0EAD9]">
            <div className="p-8 md:p-12 lg:p-16">
              <Hero />
            </div>
          </div>
        </section>


        <section>
          <LoanProgramsSection />
        </section>

        <section className="bg-blue-900 text-white text-center py-20 px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Talk Loans?</h2>
          <p className="text-lg max-w-xl mx-auto mb-6">
            Whether you're buying your first home or refinancing, I’m here to help you make smart mortgage moves.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Contact Me
          </a>
        </section>

        <section id="contact">
          <ContactForm />
        </section>


      </main>
    </>
  )
}
