import { useState, type ReactNode } from "react";
import { NavLink, redirect } from "react-router";
import type { UserLogin } from "@/models/user";
import { Login } from "@/services/authClient";
import { Button } from "../ui/button";

type LayoutProps = {
  children: ReactNode;
};

export default function UnAuthHeader({ children }: LayoutProps) {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");

  const HandleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    const payload: UserLogin = {
      LoginInformation: Username.trim(),
      Password: Password.trim(),
    };
    console.log(`${Username} ${Password}`);
    console.log("otin");
    const status = await Login(payload);
    console.log(`OTIN STATUS: ${status}`);
    redirect("/todo");
  };
  return (
    <>
      <header className="z-10 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-gray-50 px-8">
        <div className="paytoneOne text-[35px] font-bold">
          <span className="text-orange-500">One</span>
          <span className="text-green-600">Helper</span>
        </div>
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
              Log in
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
