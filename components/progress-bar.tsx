interface ProgressBarProps {
  label: string;
  value: number; // current value
  max: number; // max value
  color?: string;
}

export function ProgressBar({
  label,
  value,
  max,
  color = "bg-green-500",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs text-white/80">
        <span>{label}</span>
        <span>
          {value}/{max}
        </span>
      </div>

      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
