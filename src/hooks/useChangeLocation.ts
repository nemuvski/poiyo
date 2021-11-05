import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useChangeLocation = (callback: () => void): void => {
  const location = useLocation()
  useEffect(() => {
    callback()
  }, [location.pathname])
}
