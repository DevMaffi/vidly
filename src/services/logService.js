import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

function init() {
  Sentry.init({
    dsn: 'https://f0cf5ed44dc54a55bea12db380f7fbc5@o1022424.ingest.sentry.io/5991331',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logService = {
  init,
  log,
};

export default logService;
