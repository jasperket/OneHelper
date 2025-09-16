import AuthHeader from "@/components/layout/AuthHeader";
import { DailySleepChart } from "@/components/sleep/DailySleepChart";
import { WeeklySleepAve } from "@/components/sleep/WeeklySleepAve";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SleepTrackerPage() {
  const [isActive, setIsActive] = useState(false);
  return (
    <AuthHeader>
      <div className="grid grid-cols-2 gap-24">
        <Button
          onClick={() => setIsActive(!isActive)}
          className={`paytoneOne w-145 rounded-full py-10 text-[30px] transition-colors hover:bg-green-600 ${
            isActive ? "bg-green-600 text-white" : "bg-green-700 text-white"
          }`}
        >
          {isActive ? "Start Tracking" : "Stop Tracking"}
        </Button>
        
        <h1 className="rounded-full bg-green-600"/>
      </div>
      <div className="grid grid-cols-2 gap-24 py-10 text-gray-700">
        <DailySleepChart />
        <WeeklySleepAve />
      </div>
    </AuthHeader>
  );
}
