import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AuthHeader from "@/components/layout/AuthHeader";

// --- NEW CALENDAR IMPORTS ---
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PersonalSchedule() {
  const [selectedMonth, setSelectedMonth] = useState("August");

  // --- NEW CALENDAR STATE ---
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <AuthHeader>
      <div className="min-h-screen space-y-6 text-white">
        {/* Title + Progress Bar */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h1 className="mb-4 text-4xl font-extrabold md:mb-0">
            <span className="text-orange-500">PERSONAL</span>{" "}
            <span className="text-green-500">SCHEDULE</span>
          </h1>
          <Card className="w-full md:w-1/2">
            <CardContent className="rounded-xl bg-white p-4 text-black">
              <h2 className="mb-2 text-center text-lg font-semibold">
                Today's Progress
              </h2>
              <div className="flex items-center space-x-4">
                <Progress value={25} className="w-full" />
                <span className="text-lg font-bold">25%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Legend */}
        <div className="space-y-2">
          <div className="grid grid-cols-1">
            {[
              { color: "bg-red-600", label: "High Priority" },
              { color: "bg-orange-400", label: "Medium Priority" },
              { color: "bg-green-600", label: "Low Priority" },
              { color: "bg-gray-300", label: "Empty" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`h-4 w-4 rounded-full ${item.color}`}></div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar + Weekly Schedule */}
        <div className="grid grid-cols-6 gap-20 md:grid-cols-5">
          {/* --- REPLACED CALENDAR --- */}
          <Card>
            <CardContent className="rounded-xl bg-white p-4 text-black">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-8">
                  Select Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-35 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}  
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <div className="col-span-4 col-start-2 w-full">
            <Card className="w-full">
              <CardContent className="rounded-xl bg-white p-1 text-black">
                <div className="mb-4 grid grid-cols-5 gap-1 text-center text-base font-semibold">
                  <span>Monday 11</span>
                  <span>Tuesday 12</span>
                  <span>Wednesday 13</span>
                  <span>Thursday 14</span>
                  <span>Friday 15</span>
                </div>

                <div className="grid h-72 grid-cols-5 gap-4">
                  {[
                    ["orange", "orange", "green", "orange", "orange"],
                    ["red", "red", "green", "red", "red"],
                    ["red", "empty", "green", "empty", "red"],
                  ].map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      {row.map((color, colIndex) => (
                        <div
                          key={colIndex}
                          className={`h-full rounded-md ${
                            color === "red"
                              ? "bg-red-600"
                              : color === "orange"
                                ? "bg-orange-400"
                                : color === "green"
                                  ? "bg-green-600"
                                  : "bg-gray-200"
                          }`}
                        ></div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthHeader>
  );
}
