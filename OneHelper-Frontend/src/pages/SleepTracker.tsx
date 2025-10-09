import AuthHeader from "@/components/layout/AuthHeader";
import { DailySleepChart } from "@/components/sleep/DailySleepChart";
import TrackBtn from "@/components/sleep/TrackBtn";
import { WeeklySleepAve } from "@/components/sleep/WeeklySleepAve";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { getSleepAnalysis } from "@/services/sleepClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const sleepIndicators = [
  "bg-green-600",
  "bg-amber-500",
  "bg-orange-500",
  "bg-red-600",
];

export default function SleepTrackerPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["sleepAnalysis"],
    queryFn: getSleepAnalysis,
  });

  useEffect(() => {
    if (
      isError &&
      error instanceof AxiosError &&
      error.response?.status === 500
    ) {
      toast.error("An unexpected error occurred");
    }
  }, [isError, error]);
  return (
    <AuthHeader>
      <h1 className="paytoneOne mb-7 text-5xl text-orange-400">
        Sleep <span className="text-green-400">Tracker</span>
      </h1>
      <div className="grid grid-cols-2 gap-24">
        <TrackBtn />
        <h1
          className={cn(
            "paytoneOne flex items-center justify-center gap-2 rounded-full bg-green-600 text-2xl font-bold text-white",
            isError && "bg-red-600",
            sleepIndicators[data?.status ?? 0],
          )}
        >
          {isPending ? (
            <>
              Loading
              <span>
                <Spinner className="size-6" />
              </span>
            </>
          ) : isError ? (
            "No sleep logs"
          ) : (
            `${Math.ceil(data?.sleepDebt)} minutes of sleep debt`
          )}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-24 py-10 text-gray-700">
        <DailySleepChart />
        <WeeklySleepAve />
      </div>
    </AuthHeader>
  );
}
