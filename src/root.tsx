import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import Nav from 'components/nav';

// Styles
import 'styles/main.scss';

export async function loader() {
  return json({
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { GA_MEASUREMENT_ID } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body>
        <Nav />
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

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
      <h1>
        {isRouteErrorResponse(error) && error.status === 404
          ? "Sorry, the thing you're looking for isn't here."
          : 'Somthing went wrong here!'}
      </h1>
      <Link to="/">Go home</Link>
    </>
  );
}
