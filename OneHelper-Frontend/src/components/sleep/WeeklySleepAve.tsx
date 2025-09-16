"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = "A mixed bar chart"

const chartData = [
  { browser: "weekOne", hoursOfSleep: 8, fill: "var(--color-weekOne)" },
  { browser: "weekTwo", hoursOfSleep: 6, fill: "var(--color-weekTwo)" },
  { browser: "weekThree", hoursOfSleep: 5, fill: "var(--color-weekThree)" },
  { browser: "weekFour", hoursOfSleep: 7, fill: "var(--color-weekFour)" },
]

const chartConfig = {
  hoursOfSleep: {
    label: "Hours",
  },
  weekOne: {
    label: "1st wk",
    color: "var(--chart-1)",
  },
  weekTwo: {
    label: "2nd wk",
    color: "var(--chart-2)",
  },
  weekThree: {
    label: "3rd wk",
    color: "var(--chart-3)",
  },
  weekFour: {
    label: "4th wk",
    color: "var(--chart-4)",
  },

} satisfies ChartConfig

export function WeeklySleepAve() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Statistics for the month of June</CardTitle>
        <CardDescription>week 1 - week 4</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="hoursOfSleep" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="hoursOfSleep" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
