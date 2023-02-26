import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CONFIG_EMPTY from '../config_empty'

/**
 * 菜单导航
 * @param {*} props
 * @returns
 */
export const Nav = (props) => {
  const { customNav } = props
  const { locale } = useGlobal()
  let links = [
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: CONFIG_EMPTY.MENU_SEARCH },
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG_EMPTY.MENU_ARCHIVE },
    { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: CONFIG_EMPTY.MENU_CATEGORY },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: CONFIG_EMPTY.MENU_TAG }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  return (
        <nav className="w-full bg-white md:pt-0 px-6 relative z-20 border-t border-b border-gray-light dark:border-hexo-black-gray dark:bg-black">
            <div className="container mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start">
                <div className="w-full text-center md:text-left flex flex-wrap justify-center items-stretch md:justify-start md:items-start">
                    {links.map(link => {
                      if (link.show) {
                        return link && <Link
                                href={link.to}
                                key={link.to}
                                className="px-2 md:pl-0 md:mr-3 my-4 md:pr-3 text-gray-700 dark:text-gray-200 no-underline md:border-r border-gray-light">
                                {link.name}
                            </Link>
                      } else {
                        return null
                      }
                    })}
                </div>
                <div className="w-full md:w-1/3 text-center md:text-right">
                    {/* <!-- extra links --> */}
                </div>
            </div>
        </nav>
  )
}
