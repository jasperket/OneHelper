import { getSleepAnalysis } from "@/services/sleepClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

const sleepIndicators = [
  "bg-green-600",
  "bg-amber-500",
  "bg-orange-500",
  "bg-red-600",
];

export default function Analysis() {
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
    <h2
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
    </h2>
  );
}
