import React from 'react'

type SectionProps = {
  id: string
  // shown in the header navigation, which collects every Section of the page
  label: string
  className?: string
  children: React.ReactNode
}

export default function Section({ id, label, className = '', children }: SectionProps) {
  return (
    <section id={id} data-header-label={label} className={`header-item scroll-mt-[8%] ${className}`}>
      {children}
    </section>
  )
}
