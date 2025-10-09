import type { SleepRequest } from "@/models/sleepLog";
import {
  createSleepLog,
  getActiveSleepLog,
  updateSleepLog,
} from "@/services/sleepClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";

export default function TrackBtn() {
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

  useEffect(() => {
    if (isError) {
      toast.error("An unexpected error occurred");
    }
  }, [isError, error]);
  return (
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
  );
}
