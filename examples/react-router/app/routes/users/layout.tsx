import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <h1>Users</h1>
      <Outlet />
    </div>
  );
}
