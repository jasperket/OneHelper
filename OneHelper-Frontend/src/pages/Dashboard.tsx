import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import AuthHeader from "@/components/layout/AuthHeader";

const weeklySleepData = [
  { day: "Mon", value: 90 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 50 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 20 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 40 },
];

const sleepQualityData = [
  { name: "Deep Sleep", value: 80 },
  { name: "Other", value: 20 },
];

const COLORS = ["#f97316", "#111827"];

export default function Dashboard() {
  return (
    <AuthHeader>
      <div className="flex min-h-screen flex-col  p-6 text-white">
        {/* Task Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <Card className="bg-orange-500 text-center">
            <CardContent className="p-6">
              <h2 className="text-lg">Total Tasks</h2>
              <p className="text-4xl font-bold">24</p>
            </CardContent>
          </Card>
          <Card className="bg-white text-center text-black">
            <CardContent className="p-6">
              <h2 className="text-lg">Finished Tasks</h2>
              <p className="text-4xl font-bold">10</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500 text-center">
            <CardContent className="p-6">
              <h2 className="text-lg">Current Tasks</h2>
              <p className="text-4xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white text-center text-black">
            <CardContent className="p-6">
              <h2 className="text-lg">Pending Tasks</h2>
              <p className="text-4xl font-bold">2</p>
            </CardContent>
          </Card>
        </div>

        {/* Sleep and Productivity Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Weekly Sleep */}
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-2 font-semibold">Weekly Sleep</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklySleepData}>
                  <XAxis dataKey="day" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-2 text-center">
                Average Sleep <span className="font-bold">8.5 Hours</span>
              </p>
            </CardContent>
          </Card>

          {/* Sleep Quality */}
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-2 font-semibold">Sleep Quality</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={sleepQualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sleepQualityData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p className="mt-2 text-center">
                Deep Sleep: <span className="font-bold">80%</span>
              </p>
            </CardContent>
          </Card>

          {/* Daily Productivity */}
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-2 font-semibold">Daily Productivity</h2>
              <p className="text-lg">Productivity Score</p>
              <p className="text-4xl font-bold text-green-500">88</p>
              <div className="mt-4">
                <h3 className="font-semibold">Recent Activities</h3>
                <ul className="list-inside list-disc text-sm">
                  <li>Spelunking - Completed</li>
                  <li>Cave Diving - Completed</li>
                  <li>Base Jumping - Completed</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthHeader>
  );
}
