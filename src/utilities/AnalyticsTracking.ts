/**
 * Firebase Analyticsのトラッキングのヘルパー関数を定義.
 */

import { logEvent } from 'firebase/analytics'
import { firebaseAnalytics } from '~/libs/Firebase'

const appName = 'poiyo'

const search = (term: string): void => {
  if (!term) {
    return
  }
  logEvent(firebaseAnalytics, 'search', {
    search_term: term,
    app_name: appName,
  })
}

export default { search }
