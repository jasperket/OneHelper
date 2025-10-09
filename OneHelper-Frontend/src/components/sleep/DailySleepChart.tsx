import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getSleepHours } from "@/services/sleepClient";

export const description = "A linear line chart";

const chartData = [
  { day: "Sunday", desktop: 186 },
  { day: "Monday", desktop: 305 },
  { day: "Tuesday", desktop: 237 },
  { day: "Wednesday", desktop: 73 },
  { day: "Thursday", desktop: 209 },
  { day: "Friday", desktop: 214 },
  { day: "Saturday", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function DailySleepChart() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["sleepHours"],
    queryFn: async () => {
      const data = await getSleepHours();
      return data.map((item) => {
        const date = new Date(item.date);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        return {
          day: weekday,
          hoursSlept: item.hoursSlept,
        };
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Duration</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          // Skeleton loader while waiting for data
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-[200px] w-full rounded-md" />
          </div>
        ) : isError ? (
          <div className="text-sm text-red-500">
            Failed to load data:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data ?? chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="hoursSlept"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing daily sleep duration for the last week
        </div>
      </CardFooter>
    </Card>
  );
}
