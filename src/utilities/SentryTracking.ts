/**
 * Sentryのトラッキングのヘルパー関数を定義.
 */

import Sentry from '../libs/common/Sentry';

const exception = (error: string | Error): void => {
  console.error(error);
  Sentry.captureException(error);
};

export default { exception };
