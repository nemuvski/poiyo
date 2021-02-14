/**
 * Firebase Analyticsのトラッキングのヘルパー関数を定義.
 */

import firebase from "../libs/common/Firebase";

const appName = 'poiyo';

const screenView = (screenName: string): void => {
  firebase.analytics().logEvent('screen_view', {
    screen_name: screenName,
    app_name: appName,
  });
};

const search = (term: string): void => {
  if (!term) {
    return;
  }
  firebase.analytics().logEvent('search', {
    search_term: term,
    app_name: appName,
  });
};

export default { screenView, search };