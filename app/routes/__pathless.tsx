import { Outlet } from "@remix-run/react";

export default function PathlessPage() {
  return (
    <>
      <h1>Pathless header</h1>
      <Outlet></Outlet>
    </>
  );
}
