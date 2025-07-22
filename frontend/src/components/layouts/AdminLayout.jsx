import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-700 text-white">
        <div>Imagely</div>
        <div>Admin Layout</div>
      </header>
      <Outlet />
    </>
  );
}
