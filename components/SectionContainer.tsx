import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="flex min-h-screen w-full flex-col justify-between">{children}</section>
}
