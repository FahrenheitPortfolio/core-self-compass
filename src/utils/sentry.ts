import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.VITE_APP_ENV || 'development';

  if (!dsn) {
    console.warn('Sentry DSN not configured');
    return;
  }

  Sentry.init({
    dsn,
    environment,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
    beforeSend(event) {
      // Filter out sensitive data
      if (event.request?.data) {
        delete event.request.data.password;
        delete event.request.data.email;
      }
      return event;
    },
    ignoreErrors: [
      // Ignore common browser errors
      'Non-Error promise rejection captured',
      'ResizeObserver loop limit exceeded',
      'Network request failed',
    ],
  });
};

// Custom error boundary
export const SentryErrorBoundary = Sentry.withErrorBoundary;