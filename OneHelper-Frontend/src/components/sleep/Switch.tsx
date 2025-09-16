import { Switch } from "@/components/ui/switch";


export default function SleepSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch />
      <span>Enable Sleep Tracking</span>
    </div>
  );
}
