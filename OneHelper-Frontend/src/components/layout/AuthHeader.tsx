import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

type LayoutProps = {
  children: ReactNode;
};

export default function AuthHeader({ children }: LayoutProps) {
  const { user } = useAuth();
  return (
    <>
      <header className="bg-gray-50 text-gray-700">
        <nav className="mx-auto flex h-16 items-center overflow-hidden px-10">
          <NavLink to="/dashboard">
            <h2 className="text-themeOrange paytoneOne transform text-[35px] font-extrabold transition-all duration-200 hover:scale-101">
              One<span className="text-themeGreen">Helper</span>
            </h2>
          </NavLink>
          <ul className="absolute left-2/4 flex -translate-x-2/4 items-center">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `border-r border-gray-300 px-10 py-5 transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-300 text-black"
                    : "text-black hover:bg-orange-300"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `border-r border-gray-300 px-10 py-5 transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-300 text-black"
                    : "text-black hover:bg-orange-300"
                }`
              }
            >
              Schedule
            </NavLink>
            <NavLink
              to="/todo"
              className={({ isActive }) =>
                `border-r border-gray-300 px-10 py-5 transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-300 text-black"
                    : "text-black hover:bg-orange-300"
                }`
              }
            >
              To-do
            </NavLink>
            <NavLink
              to="/sleep"
              className={({ isActive }) =>
                `border-gray-300 px-10 py-5 transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-300 text-black"
                    : "text-black hover:bg-orange-300"
                }`
              }
            >
              Sleep
            </NavLink>
          </ul>
          <div className="ml-auto flex items-center gap-4">
            <div className="rounded-full border border-black p-4"></div>
            <p>{user ? user : "Guest"}</p>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl p-4 pt-8">{children}</main>
    </>
  );
}
