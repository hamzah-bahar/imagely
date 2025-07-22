import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-700 text-white">
        <div>Imagely</div>
        <div>Guest Layout</div>
      </header>
      <Outlet />
    </>
  );
}
