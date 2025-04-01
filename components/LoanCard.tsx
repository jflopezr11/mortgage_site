'use client'

import { ChevronDown } from 'lucide-react'

export default function LoanCard({ loan }: { loan: any }) {
  return (
    <div className="group relative border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden flex flex-col transition-all duration-500 ease-in-out">
      <img
        src={loan.imageUrl}
        alt={loan.loanName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-blue-900 text-center">
          {loan.loanName}
        </h2>

        {/* ▼ More Info */}
        <div className="flex justify-center items-center text-sm text-blue-600 mt-1">
          <span className="mr-1">More Info</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
        </div>

        {/* Description */}
        <div className="max-h-0 group-hover:max-h-[500px] transition-all duration-500 ease-in-out overflow-hidden">
          <p className="text-sm text-gray-600 mt-2">
            {loan.loanDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

