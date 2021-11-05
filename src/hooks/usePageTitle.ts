import { useEffect } from 'react'

export const usePageTitle = (title: string, setSiteTitle = true): void => {
  useEffect(() => {
    document.title = setSiteTitle ? `${title} - Poiyo` : title
  }, [title, setSiteTitle])
}
