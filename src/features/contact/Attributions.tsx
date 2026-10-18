import Dialog from '@/components/ui/Dialog'
import { profile } from '@/data/profile'

export default function Attributions() {
  return (
    <Dialog label="Attributions">
      <div className="flex flex-col">
        {profile.attributions.map((attribution) => (
          <a key={attribution.url} href={attribution.url} target="_blank" rel="noreferrer" className="text-primary-600 hover:text-primary-800">
            {attribution.name}
          </a>
        ))}
      </div>
    </Dialog>
  )
}
