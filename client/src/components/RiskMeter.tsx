import { useEffect, useState } from "react";

interface RiskMeterProps {
  score: number;
  label: string;
  className?: string;
}

export function RiskMeter({ score, label, className = "" }: RiskMeterProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (score < 30) return "from-chart-2 to-chart-2";
    if (score < 70) return "from-chart-3 to-chart-3";
    return "from-chart-5 to-chart-5";
  };

  const getRiskLevel = () => {
    if (score < 30) return "Low";
    if (score < 70) return "Medium";
    return "High";
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
          {getRiskLevel()} Risk
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden bg-muted">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="text-right mt-1">
        <span className="text-lg font-semibold">{score}%</span>
      </div>
    </div>
  );
}
