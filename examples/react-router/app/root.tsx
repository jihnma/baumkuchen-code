import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

const getErrorMessage = (error: unknown) => {
  const messages = {
    unExpected: "An unexpected error occurred.",
    notFound: "The requested page could not be found.",
  };

  const isNotFound = isRouteErrorResponse(error) && error.status === 400;
  const isError = !isRouteErrorResponse(error) && error instanceof Error;
  const isDev = import.meta.env.DEV;

  if (isNotFound) return messages.notFound;
  if (isDev && isError) return error.stack;

  return messages.unExpected;
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = getErrorMessage(error);

  return (
    <pre>
      <code>{message}</code>
    </pre>
  );
}
