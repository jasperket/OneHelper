import AuthHeader from "@/components/layout/AuthHeader";
import { DailySleepChart } from "@/components/sleep/DailySleepChart";
import { WeeklySleepAve } from "@/components/sleep/WeeklySleepAve";
import { useState } from "react";

export default function SleepTrackerPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <AuthHeader>
      <h1 className="paytoneOne mb-7 text-5xl text-orange-400">
        Sleep <span className="text-green-400">Tracker</span>
      </h1>
      <div className="grid grid-cols-2 gap-24">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`paytoneOne relative h-[80px] w-145 overflow-hidden rounded-full py-5 text-[30px] text-white transition-colors duration-500 ease-in-out ${
            isActive ? "bg-amber-500" : "bg-green-600"
          }`}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${
              isActive ? "translate-y-full" : "-translate-y-0"
            }`}
          >
            Start Tracking
          </span>

          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${
              isActive ? "translate-y-0" : "translate-y-full"
            }`}
          >
            Stop Tracking
          </span>
        </button>
        <h1 className="rounded-full bg-green-600" />
      </div>
      <div className="grid grid-cols-2 gap-24 py-10 text-gray-700">
        <DailySleepChart />
        <WeeklySleepAve />
      </div>
    </AuthHeader>
  );
}
