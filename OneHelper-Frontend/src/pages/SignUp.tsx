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
import { useState } from "react";
import type { User } from "@/models/user";
import { Register } from "@/services/authClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  validateRegister,
  type RegisterFormErrors,
} from "@/lib/validation/registerValidation";
import { toast } from "sonner";

export default function SignUpPage() {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Email, SetEmail] = useState("");
  const [PhoneNumber, SetPhoneNumber] = useState("");
  const [Height, SetHeight] = useState("");
  const [Weight, SetWeight] = useState("");
  const [DOB, SetDOB] = useState<Date>();
  const [Gender, SetGender] = useState("");
  const [busy, setBusy] = useState(false);

  const validate = () => {
    const nextErrors = validateRegister({
      Username,
      Password,
      FirstName,
      LastName,
      Gender,
      DOB,
      Height,
      Weight,
      Email,
      PhoneNumber,
    });
    let i = 0;
    for (const key in nextErrors) {
      if (i >= 3) break;
      toast.dismiss();
      const typedKey = key as keyof RegisterFormErrors;
      toast.error(`Error in ${typedKey}`, {
        description: nextErrors[typedKey],
        position: "top-center",
      });
      i++;
    }
    return Object.keys(nextErrors).length === 0;
  };

  const clearFields = () => {
    SetUsername("");
    SetPassword("");
    setShowPassword(false);
    SetFirstName("");
    SetLastName("");
    SetEmail("");
    SetPhoneNumber("");
    SetHeight("");
    SetWeight("");
    SetDOB(undefined);
    SetGender("");
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !DOB) return;
    const payload: User = {
      Username: Username.trim(),
      Password: Password.trim(),
      Gender: Gender,
      DateOfBirth: DOB.toISOString().split("T")[0],
      Email: Email,
      PhoneNumber: PhoneNumber,
      FirstName: FirstName,
      LastName: LastName,
      Height: parseFloat(Height),
      Weight: parseFloat(Weight),
    };
    try {
      setBusy(true);
      const registered = await Register(payload);
      if (registered) {
        toast.success("Account created successfully", {
          description: "You can now log in",
        });
        clearFields();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setBusy(false);
    }
  };
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
          <form
            className="w-full max-w-lg space-y-4 p-1"
            onSubmit={HandleSubmit}
          >
            <h2 className="text-3xl font-bold text-white">Create an account</h2>
            <p className="text-sm text-gray-300">Fields with * are required</p>

            {/* Username & Password */}
            <div className="relative grid grid-cols-2 gap-4 text-white">
              <Input
                name="username"
                placeholder="Username*"
                onChange={(e) => {
                  SetUsername(e.target.value);
                }}
                value={Username}
              />
              <div className="text-white">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password*"
                  onChange={(e) => {
                    SetPassword(e.target.value);
                  }}
                  value={Password}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/80 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Input
                name="firstName"
                placeholder="First Name*"
                onChange={(e) => {
                  SetFirstName(e.target.value);
                }}
                value={FirstName}
              />
              <Input
                name="lastName"
                placeholder="Last Name*"
                onChange={(e) => {
                  SetLastName(e.target.value);
                }}
                value={LastName}
              />
            </div>

            {/* Gender  and Date of Birth */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Select value={Gender} onValueChange={SetGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sex*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {/* Date of Birth */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!DOB}
                    className="data-[empty=true]:text-muted-foreground justify-start bg-transparent text-left font-normal hover:bg-transparent hover:text-white"
                  >
                    <CalendarIcon />
                    {DOB ? format(DOB, "PPP") : <span>Date of Birth*</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={DOB} onSelect={SetDOB} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Height, Weight */}
            <div className="flex gap-4 text-white">
              <Input
                type="text"
                name="height"
                placeholder="Height* (m)"
                onChange={(e) => {
                  SetHeight(e.target.value);
                }}
                value={Height}
              />
              <Input
                type="text"
                name="weight"
                placeholder="Weight* (kg)"
                onChange={(e) => {
                  SetWeight(e.target.value);
                }}
                value={Weight}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4 text-white">
              <Input
                type="email"
                name="email"
                placeholder="Email*"
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                value={Email}
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={(e) => {
                  SetPhoneNumber(e.target.value);
                }}
                value={PhoneNumber}
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400"
            >
              {busy ? "Creating..." : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </UnAuthHeader>
  );
}
