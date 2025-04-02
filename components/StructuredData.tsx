'use client'

type Props = {
  json: Record<string, any>
}

export default function StructuredData({ json }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}

