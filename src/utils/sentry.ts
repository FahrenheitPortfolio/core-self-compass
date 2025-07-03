
import * as Sentry from '@sentry/react';
import React from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { createRoutesFromChildren, matchRoutes } from 'react-router-dom';

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
      Sentry.browserTracingIntegration({
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
      if (event.request?.data && typeof event.request.data === 'object') {
        const data = event.request.data as any;
        if ('password' in data) delete data.password;
        if ('email' in data) delete data.email;
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
