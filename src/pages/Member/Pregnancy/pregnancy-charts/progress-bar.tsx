interface ProgressBarProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  color: string;
}

export default function ProgressBar({
  label,
  value,
  unit,
  min,
  max,
  color,
}: ProgressBarProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const status =
    value >= min && value <= max
      ? 'Trong phạm vi bình thường'
      : 'Ngoài phạm vi bình thường';

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center">
          <span className="text-lg font-bold mr-2">
            {value} {unit}
          </span>
          <span className="text-xs text-green-600">{status}</span>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}
