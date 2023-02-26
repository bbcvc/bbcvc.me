import React from 'react'
import Prism from 'prismjs'
// 所有语言的prismjs 使用autoloader引入
// import 'prismjs/plugins/autoloader/prism-autoloader'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// mermaid图
import BLOG from '@/blog.config'
import { isBrowser, loadExternalResource } from '@/lib/utils'

/**
 * @author https://github.com/txs/
 * @returns
 */
const PrismMac = () => {
  if (isBrowser()) {
    if (BLOG.CODE_MAC_BAR) {
      loadExternalResource('/css/prism-mac-style.css', 'css')
    }
    loadExternalResource(BLOG.PRISM_THEME_PATH, 'css')
    loadExternalResource(BLOG.PRISM_JS_AUTO_LOADER, 'js').then((e) => {
      Prism.plugins.autoloader.languages_path = BLOG.PRISM_JS_PATH
      renderPrismMac()
    })
  }

  React.useEffect(() => {
    renderMermaid()
  }, [])
  return <></>
}

/**
 * 将mermaid语言 渲染成图片
 */
const renderMermaid = async() => {
  //   支持 Mermaid
  const mermaidPres = document.querySelectorAll('pre.notion-code.language-mermaid')
  if (mermaidPres) {
    for (const e of mermaidPres) {
      const chart = e.querySelector('code').textContent
      if (chart && !e.querySelector('.mermaid')) {
        const m = document.createElement('div')
        m.className = 'mermaid'
        m.innerHTML = chart
        e.appendChild(m)
      }
    }
  }

  const mermaidsSvg = document.querySelectorAll('.mermaid')
  if (mermaidsSvg) {
    let needLoad = false
    for (const e of mermaidsSvg) {
      if (e?.firstChild?.nodeName !== 'svg') {
        needLoad = true
      }
    }
    if (needLoad) {
      const asyncMermaid = await import('mermaid')
      asyncMermaid.default.contentLoaded()
    }
  }
}

function renderPrismMac() {
  const container = document?.getElementById('container-inner')

  // Add line numbers
  if (BLOG.CODE_LINE_NUMBERS === 'true') {
    const codeBlocks = container?.getElementsByTagName('pre')
    if (codeBlocks) {
      Array.from(codeBlocks).forEach(item => {
        if (!item.classList.contains('line-numbers')) {
          item.classList.add('line-numbers')
          item.style.whiteSpace = 'pre-wrap'
        }
      })
    }
  }
  // 重新渲染之前检查所有的多余text

  try {
    Prism.highlightAll()
  } catch (err) {
    console.log('代码渲染', err)
  }

  const codeToolBars = container?.getElementsByClassName('code-toolbar')
  // Add pre-mac element for Mac Style UI
  if (codeToolBars) {
    Array.from(codeToolBars).forEach(item => {
      const existPreMac = item.getElementsByClassName('pre-mac')
      if (existPreMac.length < codeToolBars.length) {
        const preMac = document.createElement('div')
        preMac.classList.add('pre-mac')
        preMac.innerHTML = '<span></span><span></span><span></span>'
        item?.appendChild(preMac, item)
      }
    })
  }

  // 折叠代码行号bug
  if (BLOG.CODE_LINE_NUMBERS === 'true') {
    fixCodeLineStyle()
  }
}

/**
 * 行号样式在首次渲染或被detail折叠后行高判断错误
 * 在此手动resize计算
 */
const fixCodeLineStyle = () => {
  const observer = new MutationObserver(mutationsList => {
    for (const m of mutationsList) {
      if (m.target.nodeName === 'DETAILS') {
        const preCodes = m.target.querySelectorAll('pre.notion-code')
        for (const preCode of preCodes) {
          Prism.plugins.lineNumbers.resize(preCode)
        }
      }
    }
  })
  observer.observe(document.querySelector('#container'), { attributes: true, subtree: true })
  setTimeout(() => {
    const preCodes = document.querySelectorAll('pre.notion-code')
    for (const preCode of preCodes) {
      console.log('code', preCode)
      Prism.plugins.lineNumbers.resize(preCode)
    }
  }, 10)
}

export default PrismMac
