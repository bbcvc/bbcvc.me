import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import CONFIG_HEXO from '../config_hexo'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0
let windowTop = 0
let autoScroll = false

/**
 *
 * @returns 头图
 */
const Header = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  useEffect(() => {
    updateHeaderHeight()
    if (!typed && window && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: CONFIG_HEXO.HOME_BANNER_GREETINGS,
          typeSpeed: 200,
          backSpeed: 100,
          backDelay: 400,
          showCursor: true,
          smartBackspace: true
        })
      )
    }
    if (enableAutoScroll) {
      scrollTrigger()
      window.addEventListener('scroll', scrollTrigger)
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      if (enableAutoScroll) {
        window.removeEventListener('scroll', scrollTrigger)
      }
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight () {
    setTimeout(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    }, 500)
  }

  return (
    <header
      id="header"
      className="duration-500 md:bg-fixed w-full bg-cover bg-center h-screen bg-black text-white relative z-10"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0,0,0,0.5), rgba(0,0,0,0.3), rgba(0,0,0,0.5), rgba(0, 0, 0, 0.9) ),url("${siteInfo?.pageCover}")`
      }}
    >
      <div className="absolute flex flex-col h-full items-center justify-center w-full ">
        <div className='text-4xl md:text-5xl text-white shadow-text'>{siteInfo?.title}</div>
        <div className='mt-2 h-12 items-center text-center shadow-text text-white text-lg'>
          <span id='typed'/>
        </div>

        {/* 首页导航插件 */}
        { CONFIG_HEXO.HOME_NAV_BUTTONS && <NavButtonGroup {...props}/>}

      </div>
      <div
        onClick={() => {
          window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
        }}
        className="cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white"
      >
        <i className='animate-bounce fas fa-angle-down'/>
      </div>
    </header>
  )
}

const enableAutoScroll = false // 是否开启自动吸附滚动

const autoScrollEnd = () => {
  if (autoScroll) {
    windowTop = window.scrollY
    autoScroll = false
  }
}

/**
   * 自动吸附滚动，移动端体验不好暂时关闭
   */
const scrollTrigger = () => {
  if (screen.width <= 768) {
    return
  }

  const scrollS = window.scrollY
  // 自动滚动
  if ((scrollS > windowTop) & (scrollS < window.innerHeight) && !autoScroll
  ) {
    autoScroll = true
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
    setTimeout(autoScrollEnd, 500)
  }
  if ((scrollS < windowTop) && (scrollS < window.innerHeight) && !autoScroll) {
    autoScroll = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(autoScrollEnd, 500)
  }
  windowTop = scrollS
}

export default Header
