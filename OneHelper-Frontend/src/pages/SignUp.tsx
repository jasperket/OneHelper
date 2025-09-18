import UnAuthHeader from "@/components/layout/UnAuthHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavLink } from "react-router";


export default function SignUpPage() {
  return (
    <UnAuthHeader>
      <div className="grid h-screen grid-cols-1 md:grid-cols-[2fr_1fr]">
        {/* Left side (image) */}
        <div className="hidden items-center justify-center bg-gray-100 md:flex">
          <img
            src="/stats.jpg"
            alt="Statistics"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center p-8">
          <form className="w-full max-w-lg space-y-4 p-1">
            <h2 className="text-3xl font-bold text-white">Create an account</h2>
            <p className="text-sm text-gray-300">Fields with * are required</p>

            {/* Username & Password */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Input name="username" placeholder="*Username" />
              <Input type="password" name="password" placeholder="*Password" />
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Input name="firstName" placeholder="First Name" />
              <Input name="lastName" placeholder="Last Name" />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Input type="email" name="email" placeholder="Email" />
              <Input type="tel" name="phone" placeholder="Phone Number" />
            </div>

            {/* Height, Weight, DOB */}
            <div className="flex gap-4 text-white">
              <Input type="text" name="height" placeholder="Height (cm)" />
              <Input type="text" name="weight" placeholder="Weight (kg)" />
            </div>

            {/* Gender  and Date of Birth */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
              <Input type="date" name="dob" className="w-full min-w-fit" />
            </div>

            <Button
              type="submit"
              className="w-full rounded bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400"
            >
              Create account
            </Button>
            <NavLink
              to="/"
              className="mt-10 block text-center text-[15px] text-gray-300 hover:underline"
            >
              Already have an account? Log in
            </NavLink>
          </form>
        </div>
      </div>
    </UnAuthHeader>
  );
}
