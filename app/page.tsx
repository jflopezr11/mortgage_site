import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import LoanProgramsSection from '@/components/LoanProgramsSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Joshua Lopez - Mortgage Specialist | NMLS #2230624</title>
        <meta name="description" content="Helping you navigate the mortgage process with confidence and clarity." />
        <meta name="keywords" content="homeloans near me, mortgage, loans, refinance, VA loan, FHA loan" />
      </Head>

      <main>
        <section className="hero-section">
          <Hero />
        </section>

        <LoanProgramsSection />
      </main>
    </>
  )
}
