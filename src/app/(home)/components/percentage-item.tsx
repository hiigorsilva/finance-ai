import type { ReactNode } from 'react'

type PercentageItemProps = {
  icon: ReactNode
  title: 'Investidos' | 'Ganhos' | 'Gastos'
  value: number
}

export const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      {/* NAME + ICON */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`w-fit p-2.5 rounded-md 
          ${title === 'Investidos' && 'bg-blue-400/10'}
          ${title === 'Ganhos' && 'bg-primary/10'}
          ${title === 'Gastos' && 'bg-red-400/10'}
          `}
        >
          {icon}
        </div>
        <h3 className="text-sm text-muted-foreground">{title}</h3>
      </div>
      {/* PERCENTAGE */}
      <span className="font-bold text-sm">{value}%</span>
    </div>
  )
}
