import React from 'react'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import CONFIG_MATERY from '../config_matery'

const MenuButtonGroupTop = (props) => {
  const { customNav } = props
  const { locale } = useGlobal()

  let links = [
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG_MATERY.MENU_ARCHIVE },
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: CONFIG_MATERY.MENU_SEARCH },
    { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: CONFIG_MATERY.MENU_CATEGORY },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: CONFIG_MATERY.MENU_TAG }
  ]

  if (customNav) {
    links = customNav.concat(links)
  }

  return (
    <nav id='nav' className='leading-8 flex justify-center  font-light w-full'>
      {links.map(link => {
        if (link.show) {
          return (
            <Link
              key={`${link.to}`}
              title={link.to}
              href={link.to}
              target={link.to.indexOf('http') === 0 ? '_blank' : '_self'}
              className={'py-1.5 my-1 px-3  text-base justify-center items-center cursor-pointer'}>

              <div className='w-full flex text-sm items-center justify-center hover:scale-125 duration-200 transform'>
                <i className={`${link.icon} mr-1`}/>
                <div className='text-center'>{link.name}</div>
              </div>

            </Link>
          )
        } else {
          return null
        }
      })}
    </nav>
  )
}
export default MenuButtonGroupTop
