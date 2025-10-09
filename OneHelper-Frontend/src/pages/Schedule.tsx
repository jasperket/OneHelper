import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AuthHeader from "@/components/layout/AuthHeader";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { type DateRange } from "react-day-picker";

export default function PersonalSchedule() {
  // const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  return (
    <AuthHeader>
      <div className="min-h-screen space-y-10 p-6 text-white">
        {/* Header + Progress */}
        <div className="flex flex-col items-center justify-between gap-15 md:flex-row">
          {/* Left Section: Title + Priority Legend */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="paytoneOne text-center text-6xl leading-tight font-semibold md:text-left">
              <span className="text-orange-500">PERSONAL</span>
              <span className="ml-2 text-green-400">SCHEDULE</span>
            </h1>

            {/* Priority Legend */}
            <div className="grid grid-cols-2 gap-5 text-sm text-black">
              {/* High Priority */}
              <div className="flex items-center justify-center gap-3 text-sm font-medium">
                <div className="h-6 w-6 rounded-full bg-red-600"></div>
                <span className="rounded-full bg-zinc-200 px-3 py-1">
                  High Priority
                </span>
              </div>

              {/* Medium Priority */}
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="h-6 w-6 rounded-full bg-orange-400"></div>
                <span className="rounded-full bg-zinc-200 px-3 py-1">
                  Medium Priority
                </span>
              </div>

              {/* Low Priority */}
              <div className="flex items-center justify-center gap-3 text-sm font-medium">
                <div className="h-6 w-6 rounded-full bg-green-600"></div>
                <span className="rounded-full bg-zinc-200 px-3 py-1">
                  Low Priority
                </span>
              </div>

              {/* Empty under Medium */}
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                <span className="rounded-full bg-zinc-200 px-3 py-1">
                  Empty
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Progress Card */}
          <Card className="w-full md:w-1/2">
            <CardContent className="rounded-xl bg-white p-6 text-black shadow-md">
              <h2 className="mb-4 text-center text-lg font-semibold">
                Today's Progress
              </h2>
              <div className="flex items-center gap-4">
                <Progress value={25} className="h-6 w-full" />
                <span className="text-lg font-bold">25%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Legend */}

        {/* Calendar + Weekly Schedule */}
        <div className="grid grid-cols-7 gap-10">
          {/* Calendar Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <Card>
              <CardContent className="rounded-xl p-6 text-black">
                <Label
                  htmlFor="date"
                  className="mb-2 block text-center text-base font-medium"
                >
                  Select Date
                </Label>
                {/* The calendar is now permanently displayed */}
                <div className="rounded-xl bg-white p-4 shadow-md">
                  <Calendar mode="range" selected={date} onSelect={setDate} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Schedule */}
          <div className="col-span-5 ">
            <Card className="w-full">
              <CardContent className="rounded-xl bg-gray-100 p-4 text-black">
                <div className="mb-4 grid grid-cols-5 text-center text-sm font-semibold text-gray-700">
                  <span>Monday 11</span>
                  <span>Tuesday 12</span>
                  <span>Wednesday 13</span>
                  <span>Thursday 14</span>
                  <span>Friday 15</span>
                </div>

                <div className="grid h-84 grid-cols-5 gap-3">
                  {/* Row 1 */}
                  {["orange", "orange", "green", "orange", "orange"].map(
                    (color, index) => (
                      <div
                        key={`r1-${index}`}
                        className={`rounded-md ${
                          color === "orange"
                            ? "bg-orange-400"
                            : color === "green"
                              ? "bg-green-500"
                              : "bg-gray-200"
                        }`}
                      ></div>
                    ),
                  )}

                  {/* Row 2 */}
                  {["red", "red", "green", "red", "red"].map((color, index) => (
                    <div
                      key={`r2-${index}`}
                      className={`rounded-md ${
                        color === "red"
                          ? "bg-red-600"
                          : color === "green"
                            ? "bg-green-500"
                            : "bg-gray-200"
                      }`}
                    ></div>
                  ))}

                  {/* Row 3 */}
                  {["red", "empty", "green", "empty", "red"].map(
                    (color, index) => (
                      <div
                        key={`r3-${index}`}
                        className={`rounded-md ${
                          color === "red"
                            ? "bg-red-600"
                            : color === "green"
                              ? "bg-green-500"
                              : "bg-gray-200"
                        }`}
                      ></div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthHeader>
  );
}
