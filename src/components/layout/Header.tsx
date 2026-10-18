import { Button } from 'primereact/button'
import { Divide as Hamburger } from 'hamburger-react'
import useHeader, { MenuLabel } from '@/components/layout/useHeader'
import { profile } from '@/data/profile'

const BAR_CLASS = 'h-[8%] fixed top-0 left-0 right-0 z-10'
const BLUR_CLASS = 'bg-primary-50/50 backdrop-blur-md'
// useHeader slides the bar out of view by animating `top`
const BAR_STYLE = { transition: 'top 0.5s ease-in-out' }

function HomeTitle() {
  return (
    <div
      className="w-full text-primary-650 hover:text-primary-750 text-2xl font-bold leading-relaxed font-mono text-center content-center cursor-pointer"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      {profile.name}
    </div>
  )
}

function BackIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
    </svg>
  )
}

function NavButtons({ menuList, onNavigate }: { menuList: MenuLabel[]; onNavigate?: () => void }) {
  return menuList.map((menu) => (
    <Button
      key={menu.url}
      label={menu.label}
      onClick={() => {
        onNavigate?.()
        window.location.href = menu.url
      }}
      text
      className={`hover:text-primary-750 text-lg no-outline hover:bg-transparent font-mono ${menu.isCurrent ? 'text-primary-850 font-bold' : 'text-primary-600'}`}
    />
  ))
}

export default function Header() {
  const { menuList, isMobileOpen, setIsMobileOpen, isHomePage, goBack } = useHeader()

  return (
    <header>
      {/* Desktop */}
      <div className={`hidden md:flex ${BAR_CLASS} ${BLUR_CLASS}`} style={BAR_STYLE}>
        <div className="flex w-full h-full">
          <div className={`header-title flex flex-grow ${isHomePage ? 'max-w-[25%]' : 'max-w-[30%]'}`}>
            {!isHomePage && (
              <div onClick={goBack} className="hover:text-primary-750 text-primary-650 w-16 flex justify-center items-center cursor-pointer">
                <BackIcon />
              </div>
            )}
            <HomeTitle />
            <div className="h-[60%] w-1 my-auto border-0 rounded dark:bg-primary-100 content-center" />
          </div>
          <div className="flex flex-grow justify-evenly">
            <NavButtons menuList={menuList} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={isMobileOpen ? `fixed top-0 left-0 right-0 z-10 h-screen ${BLUR_CLASS}` : 'hidden'} />
      <div className={`md:hidden flex flex-row ${BAR_CLASS} ${isMobileOpen ? '' : BLUR_CLASS}`} style={BAR_STYLE}>
        <div className="flex flex-row w-full">
          <div className="header-title flex flex-grow justify-between">
            <HomeTitle />
          </div>
          <div className="flex items-center flex-grow justify-end mr-[5%]">
            <Hamburger toggled={isMobileOpen} toggle={() => setIsMobileOpen(!isMobileOpen)} color="#026685" />
          </div>
        </div>

        <div className={`fixed h-screen left-0 right-0 ease-in-out duration-500 ${isMobileOpen ? 'top-[8vh] w-screen' : 'top-[108vh]'}`}>
          <div className="flex flex-col justify-evenly h-[80%]">
            <NavButtons menuList={menuList} onNavigate={() => setIsMobileOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  )
}
