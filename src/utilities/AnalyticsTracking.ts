/**
 * Firebase Analyticsのトラッキングのヘルパー関数を定義.
 */

import { firebaseAnalytics } from '../libs/Firebase'
import { logEvent } from 'firebase/analytics'

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
