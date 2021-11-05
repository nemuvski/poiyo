import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const useChangeLocation = (callback: () => void): void => {
  const savedCallback = useRef<undefined | (() => void)>()
  const location = useLocation()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (savedCallback.current) savedCallback.current()
  }, [location.pathname])
}
