import { Icon } from '@/features/contact/icons'

type ContactLinkProps = {
  href: string
  icon: Icon
  label: string
  external?: boolean
}

export default function ContactLink({ href, icon, label, external = true }: ContactLinkProps) {
  return (
    <li className="bg-primary-50 h-16 w-16 rounded-full flex items-center justify-center shrink-0">
      <a href={href} aria-label={label} {...(external && { target: '_blank', rel: 'noreferrer' })}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="var(--primary-800)" viewBox={icon.viewBox}>
          <path d={icon.path} />
        </svg>
      </a>
    </li>
  )
}
