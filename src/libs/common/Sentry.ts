/**
 * Sentryについての設定.
 */

import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import {isProduction} from "../../utilities/NodeEnv";

if (isProduction()) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    // 特定のトランザクションがSentryに送信される可能性をパーセンテージを表す.
    tracesSampleRate: 0.7,
  });
}

export default Sentry;
