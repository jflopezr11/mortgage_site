import { client } from '@/lib/sanityClient'
import { getLoanProgramsQuery } from '@/lib/queries'
import LoanCard from './LoanCard'

export default async function LoanProgramsSection() {
  const loanPrograms = await client.fetch(getLoanProgramsQuery)

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">
        Loan Programs I Work With
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loanPrograms.map((loan: any) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </section>
  )
}

