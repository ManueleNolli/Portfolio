import Section from '@/components/ui/Section'
import ParticlesBackground from '@/features/particles/ParticlesBackground'
import { parallaxParticles } from '@/features/particles/presets/parallax'
import ContactForm from '@/features/contact/ContactForm'
import ContactLink from '@/features/contact/ContactLink'
import Attributions from '@/features/contact/Attributions'
import { emailIcon, socialIcons } from '@/features/contact/icons'
import { profile } from '@/data/profile'

export default function ContactSection() {
  return (
    <Section id="contactme" label="Contact Me">
      <ParticlesBackground options={parallaxParticles} id="particlesContactMe">
        <div className="py-24 opacity-90">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:gap-12 p-8 md:p-12 mx-auto md:max-w-[70%] max-w-[90%] bg-white shadow-2xl rounded-xl">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-primary-800 text-3xl md:text-5xl text-center md:text-left font-extrabold">Contact me!</h1>
                <p className="text-gray-500 mt-4 text-lg text-left">{profile.contactPhrase}</p>
              </div>

              <div className="mt-12">
                <h2 className="text-primary-800 text-xl font-bold">Email</h2>
                <ul className="mt-4">
                  <ContactLink href={`mailto:${profile.email}`} icon={emailIcon} label="Email" external={false} />
                </ul>
              </div>

              <div className="mt-12">
                <h2 className="text-primary-800 text-xl font-bold">Socials</h2>
                <ul className="flex mt-4 space-x-4">
                  {profile.socials.map((social) => (
                    <ContactLink key={social.name} href={social.url} icon={socialIcons[social.name]} label={social.name} />
                  ))}
                </ul>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>

        <div className="absolute right-0 bottom-0">
          <Attributions />
        </div>
      </ParticlesBackground>
    </Section>
  )
}
