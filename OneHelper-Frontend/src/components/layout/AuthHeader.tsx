import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Logout } from "@/services/authClient";
import axios from "axios";
import { toast } from "sonner";

type LayoutProps = {
  children: ReactNode;
};

export default function AuthHeader({ children }: LayoutProps) {
  const { user, refreshAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Logout();
      await refreshAuth();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Logout Error", {
          description: e.response?.data.message,
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
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
          <Popover onOpenChange={handleOpen}>
            <PopoverTrigger className="ml-auto" asChild>
              <button className="relative flex cursor-pointer items-center gap-2">
                <span className="absolute inset-0 -m-4 rounded-md hover:bg-gray-100/40"></span>
                <div className="rounded-full border border-black p-4"></div>
                <p>{user ? user : "Guest"}</p>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <form onSubmit={handleLogout}>
                <button className="relative w-full cursor-pointer text-start">
                  <span className="absolute inset-0 -m-3 rounded hover:bg-gray-100/40"></span>
                  Logout
                </button>
              </form>
            </PopoverContent>
          </Popover>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl p-4 pt-8">{children}</main>
    </>
  );
}
