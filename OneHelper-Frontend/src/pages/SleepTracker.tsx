import AuthHeader from "@/components/layout/AuthHeader";
import { DailySleepChart } from "@/components/sleep/DailySleepChart";
import TrackBtn from "@/components/sleep/TrackBtn";
import { WeeklySleepAve } from "@/components/sleep/WeeklySleepAve";

export default function SleepTrackerPage() {
  return (
    <AuthHeader>
      <h1 className="paytoneOne mb-7 text-5xl text-orange-400">
        Sleep <span className="text-green-400">Tracker</span>
      </h1>
      <div className="grid grid-cols-2 gap-24">
        <TrackBtn />
        <h1 className="rounded-full bg-green-600" />
      </div>
      <div className="grid grid-cols-2 gap-24 py-10 text-gray-700">
        <DailySleepChart />
        <WeeklySleepAve />
      </div>
    </AuthHeader>
  );
}
