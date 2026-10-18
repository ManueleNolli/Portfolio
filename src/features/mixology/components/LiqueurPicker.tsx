import { Image } from 'primereact/image'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import { Liqueur, liqueurs } from '@/features/mixology/data/liqueurs'

type LiqueurPickerProps = {
  selected: Liqueur
  onSelect: (liqueur: Liqueur) => void
}

export default function LiqueurPicker({ selected, onSelect }: LiqueurPickerProps) {
  return (
    <AnimatedOnScroll className="flex overflow-x-scroll space-x-4 rounded-md no-scrollbar px-4">
      {liqueurs.map((liqueur) => (
        <button key={liqueur.ingredient.name} className="cursor-pointer h-full" onClick={() => onSelect(liqueur)}>
          <div className="flex flex-col items-center">
            <Image
              src={liqueur.ingredient.imagePath}
              alt={liqueur.ingredient.name}
              className={`rounded-lg shadow-lg w-24 h-24 p-4 ${liqueur === selected ? 'bg-primary-400' : ''}`}
            />
            <span className="text-primary-600 text-sm font-bold mt-2 text-center">{liqueur.ingredient.name}</span>
          </div>
        </button>
      ))}
    </AnimatedOnScroll>
  )
}
