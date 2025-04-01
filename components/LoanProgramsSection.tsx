import { client } from '@/lib/sanityClient'
import { getLoanProgramsQuery } from '@/lib/queries'
import LoanCard from './LoanCard'

export default async function LoanProgramsSection() {
  const loanPrograms = await client.fetch(getLoanProgramsQuery)

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6 text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
        Loan Programs I Work With
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanPrograms.map((loan: any) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </section>
  )
}

