import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import type { UserLogin } from "@/models/user";
import { Login } from "@/services/authClient";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  validateLogin,
  type LoginFormErrors,
} from "@/lib/validation/loginValidation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

type LayoutProps = {
  children: ReactNode;
};

export default function UnAuthHeader({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [Busy, SetBusy] = useState(false);

  const validate = () => {
    const nextErrors = validateLogin({
      Username,
      Password,
    });
    let i = 0;
    for (const key in nextErrors) {
      if (i >= 3) break;
      toast.dismiss();
      const typedKey = key as keyof LoginFormErrors;
      toast.error(`Error in ${typedKey}`, {
        description: nextErrors[typedKey],
        position: "top-center",
      });
      i++;
    }
    return Object.keys(nextErrors).length === 0;
  };

  const HandleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (!validate()) return;
    const payload: UserLogin = {
      LoginInformation: Username.trim(),
      Password: Password.trim(),
    };
    try {
      SetBusy(true);
      await Login(payload);
      await refreshAuth();
      navigate("/todo");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        toast.error("Login Error", {
          description:
            e.response?.data.message || "An unexpected error occurred",
          position: "top-center",
        });
      } else {
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
    } finally {
      SetBusy(false);
    }
  };
  return (
    <>
      <header className="z-10 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-gray-50 px-8">
        <Link to="/">
          <div className="paytoneOne text-[35px] font-bold">
            <span className="text-orange-500">One</span>
            <span className="text-green-600">Helper</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <form onSubmit={HandleSubmit} className="flex items-center gap-4">
            <input
              type="text"
              placeholder="username"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
              onChange={(e) => SetUsername(e.target.value)}
              value={Username}
            />
            <input
              type="password"
              placeholder="password"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
              onChange={(e) => SetPassword(e.target.value)}
              value={Password}
            />
            <Button className="cursor-pointer rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600">
              {Busy ? "Logging in..." : "Log in"}
            </Button>
          </form>
          <NavLink
            to="/signup"
            className="cursor-pointer rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-700"
          >
            Sign-up
          </NavLink>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
