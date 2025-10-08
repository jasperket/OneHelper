import AuthHeader from "@/components/layout/AuthHeader";
import { DailySleepChart } from "@/components/sleep/DailySleepChart";
import { WeeklySleepAve } from "@/components/sleep/WeeklySleepAve";
import { Spinner } from "@/components/ui/spinner";
import type { SleepRequest } from "@/models/sleepLog";
import {
  createSleepLog,
  getActiveSleepLog,
  updateSleepLog,
} from "@/services/sleepClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function SleepTrackerPage() {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["activeSleepLog"],
    queryFn: getActiveSleepLog,
  });

  const handleSleepLogBtn = () => {
    if (data) {
      stopSleepLog.mutate();
    } else {
      startSleepLog.mutate();
    }
  };

  const handleStart = async () => {
    const payload: SleepRequest = {
      startTime: new Date().toISOString(),
    };
    await createSleepLog(payload);
  };

  const handleStop = async () => {
    if (!data) return;
    const payload: SleepRequest = {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
    };
    await updateSleepLog(data?.id, payload);
  };

  const invalidateActiveSleepLog = async () => {
    await queryClient.invalidateQueries({ queryKey: ["activeSleepLog"] });
  };

  const startSleepLog = useMutation({
    mutationFn: handleStart,
    onSuccess: invalidateActiveSleepLog,
  });

  const stopSleepLog = useMutation({
    mutationFn: handleStop,
    onSuccess: invalidateActiveSleepLog,
  });

  return (
    <AuthHeader>
      <h1 className="paytoneOne mb-7 text-5xl text-orange-400">
        Sleep <span className="text-green-400">Tracker</span>
      </h1>
      <div className="grid grid-cols-2 gap-24">
        <button
          className={`paytoneOne relative h-[80px] w-145 overflow-hidden rounded-full py-5 text-[30px] text-white transition-colors duration-500 ease-in-out ${
            data ? "bg-amber-500" : "bg-green-600"
          }`}
          onClick={handleSleepLogBtn}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${
              data ? "translate-y-full" : "-translate-y-0"
            }`}
          >
            {isPending ? (
              <>
                <Spinner /> Loading
              </>
            ) : (
              "Start Tracking"
            )}
          </span>

          <span
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${
              data ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {isPending ? (
              <>
                <Spinner /> Loading
              </>
            ) : (
              "Stop Tracking"
            )}
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
