import React, { useState } from "react";
import Head from "next/head";
import * as Sentry from "@sentry/node";
import { withProfiler } from "@sentry/react";
import * as Tracing from "@sentry/tracing";
import * as Integrations from "@sentry/integrations";
import { ApolloProvider } from "@apollo/client";
import { Provider as StyletronProvider } from "styletron-react";
import { ToasterContainer } from "baseui/toast";

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@app/public/styles/react-grid-layout.css";
import "@app/public/styles/react-resizable.css";

import { styletron } from "@app/styles/styletron";
import { useApollo } from "@lib/apollo";
import ThemeProvider from "@components/UI/ThemeProvider";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    environment: process.env.NODE_ENV,
    integrations: [
      new Integrations.CaptureConsole({
        levels: ["error"],
      }),
      new Integrations.Dedupe(),
      new Tracing.Integrations.Express(),
      new Tracing.Integrations.BrowserTracing(),
    ],
    ignoreErrors: ["no data", "invalid data"],
    dsn: process.env.SENTRY_DSN,
    release: process.env.HEROKU_SLUG_COMMIT, // TODO replace with latest commit
    beforeSend(event) {
      // Check if it is an exception, and if so,
      // wait a moment before showing the report dialog
      if (event.exception && Boolean((Sentry as any).showReportDialog)) {
        setTimeout(() => (Sentry as any).showReportDialog({ eventId: event.event_id }), 3000);
      }

      return event;
    },
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  });
}

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isDark] = useState(false);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyletronProvider value={styletron}>
        <ThemeProvider isDark={isDark}>
          <ApolloProvider client={apolloClient}>
            <ToasterContainer>
              <Component {...pageProps} isDark={isDark} />
            </ToasterContainer>
          </ApolloProvider>
        </ThemeProvider>
      </StyletronProvider>
    </>
  );
}

export default withProfiler(MyApp);
