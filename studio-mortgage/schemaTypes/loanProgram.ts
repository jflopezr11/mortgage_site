import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'loanProgram',
  title: 'Loan Program',
  type: 'document',
  fields: [
    defineField({
      name: 'loanName',
      title: 'Loan Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (for URLs)',
      type: 'slug',
      options: {
        source: 'loanName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loanDescription',
      title: 'Loan Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programType',
      title: 'Program Type',
      type: 'string',
      options: {
        list: [
          { title: 'FHA', value: 'fha' },
          { title: 'Conventional', value: 'conventional' },
          { title: 'VA', value: 'va' },
          { title: 'USDA', value: 'usda' },
          { title: 'Down Payment Assistance', value: 'DPA' },
          {title: 'ITIN', value: 'itin'}, 
          {title: 'Home Equity Line of Credit', value: 'HELOC'}, 
          {title: 'Mobile Home', value: 'mobileHome'},
          {title: 'Non-QM', value: 'nonQM'},
          {title: 'Jumbo', value: 'jumbo'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'minCreditScore',
      title: 'Minimum Credit Score',
      type: 'number',
    }),
    defineField({
      name: 'downPayment',
      title: 'Down Payment Requirement (%)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Loan Program Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
})
