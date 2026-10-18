import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MOBILE_MAX_WIDTH } from '@/config'

export type MenuLabel = {
  label: string
  url: string
  isCurrent: boolean
}

export default function useHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHomePage = pathname === '/'

  const [menuList, setMenuList] = useState<MenuLabel[]>([])
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0)
  const [headerDiv, setHeaderDiv] = useState<HTMLElement | null>()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    // helper to find header items
    const findHeaderItems = () => {
      return document.querySelectorAll('.header-item')
    }

    // fill menu list
    const fillMenuList = () => {
      const headerItems = findHeaderItems()

      const newMenuList: MenuLabel[] = []
      headerItems.forEach((item: Element) => {
        const label = item.getAttribute('data-header-label') || ''
        const url = `#${item.id}`
        newMenuList.push({ label, url, isCurrent: false })
      })

      setMenuList(newMenuList)
    }

    // update current menu according to scroll position
    const updateCurrentMenu = () => {
      const currentScroll = window.scrollY
      const headerItems = findHeaderItems()

      let currentSection: string | null = null
      let closestDistance = Infinity

      headerItems.forEach((item: Element) => {
        const element = document.querySelector(`#${item.id}`)
        if (!element) return

        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const headerHeight = document.querySelector('header')?.clientHeight || 0

        const distance = Math.abs(currentScroll - (elementTop - headerHeight))
        if (distance < closestDistance) {
          closestDistance = distance
          currentSection = `#${item.id}`
        }
      })

      if (currentSection) {
        setMenuList((prevMenuList) =>
          prevMenuList.map((menu) => ({
            ...menu,
            isCurrent: menu.url === currentSection,
          }))
        )
      }
    }

    // fill menu list
    fillMenuList()

    // calculate current menu
    updateCurrentMenu()

    // add event listener to update current menu
    window.addEventListener('scroll', updateCurrentMenu)

    return () => {
      window.removeEventListener('scroll', updateCurrentMenu)
    }
    // the sections are collected from the DOM, so they must be collected again on every page
  }, [pathname])

  useEffect(() => {
    // handle header position
    const handleScrollHeaderPosition = () => {
      if (!headerDiv) return

      const currentScrollPosition = window.scrollY
      const headerBottom = headerDiv.getBoundingClientRect().bottom

      if (previousScrollPosition > currentScrollPosition || currentScrollPosition < headerBottom) {
        headerDiv.style.top = '0'
      } else {
        const headerHeight = headerDiv.clientHeight || 0
        headerDiv.style.top = `-${headerHeight}px`
      }

      setPreviousScrollPosition(currentScrollPosition)
    }

    // set header div
    const header = document.querySelector('header')
    const headerChild = header?.firstElementChild?.clientHeight ? header?.firstElementChild : header?.lastElementChild
    setHeaderDiv(headerChild as HTMLElement)

    if (isMobileOpen) return
    window.addEventListener('scroll', handleScrollHeaderPosition)
    return () => {
      window.removeEventListener('scroll', handleScrollHeaderPosition)
    }
  }, [headerDiv, isMobileOpen, previousScrollPosition])

  useEffect(() => {
    // the mobile menu cannot stay open on a desktop viewport
    const handleResize = () => {
      if (window.innerWidth > MOBILE_MAX_WIDTH) setIsMobileOpen(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // one level up: /hobbies/mixology -> /hobbies -> /
  const goBack = () => {
    navigate(pathname.replace(/\/$/, '').split('/').slice(0, -1).join('/') || '/')
  }

  return {
    menuList,
    isMobileOpen,
    setIsMobileOpen,
    isHomePage,
    goBack,
  }
}
