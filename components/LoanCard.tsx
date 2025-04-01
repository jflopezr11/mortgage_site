'use client'

export default function LoanCard({ loan }: { loan: any }) {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{loan.loanName}</h2>
      <img src={loan.imageUrl} alt={loan.loanName} className="w-full h-auto my-2" />
      <p>{loan.loanDescription}</p>
    </div>
  )
}
