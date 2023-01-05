import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export function CatchBoundary() {
  const caught = useCatch();

  let component;

  let statusNum = caught?.status && 404;

  switch (statusNum) {
    case 403:
      component = <div className="h-screen">403 in here</div>;
      break;
    case 404:
      component = <div className="h-screen">404 mannnn</div>;
      break;
    case 429:
      component = <div>429</div>;
      break;
  }

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>oh no we have an error in CatchBoundary</h1>
        {component}
        {caught?.status} {caught?.statusText}
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>oh no we have an error in ErrorBoundary</h1>
        {caught?.status} {caught?.statusText}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
