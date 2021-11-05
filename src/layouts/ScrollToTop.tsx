import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import arrowUpIcon from '~/assets/icons/arrow-up.svg'
import '~/styles/layouts/scroll-to-top.scss'

const ScrollToTop: React.FC = () => {
  const [hidden, setHidden] = useState(true)
  // スクロール処理の間引き用フラグ.
  const isProcessing = useRef(false)

  useEffect(() => {
    const handler = () => {
      // 処理中の場合はスキップ.
      if (isProcessing.current) {
        return
      }
      isProcessing.current = true
      requestAnimationFrame(() => {
        setHidden(window.scrollY < 300)
        isProcessing.current = false
      })
    }

    // スクロール時のイベントを登録する.
    document.addEventListener('scroll', handler, { passive: true })

    return () => {
      document.removeEventListener('scroll', handler)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type='button'
      className={clsx(['scroll-to-top', 'is-black', { 'is-hidden': hidden }])}
      onClick={handleClick}
    >
      <img aria-hidden='true' alt='ページトップへ' title='ページのトップへスクロールします。' src={arrowUpIcon} />
    </button>
  )
}

export default ScrollToTop
