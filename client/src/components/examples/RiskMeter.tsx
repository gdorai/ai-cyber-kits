import { RiskMeter } from "../RiskMeter";

export default function RiskMeterExample() {
  return (
    <div className="p-8 space-y-6 max-w-md">
      <RiskMeter score={25} label="Low Risk Example" />
      <RiskMeter score={55} label="Medium Risk Example" />
      <RiskMeter score={85} label="High Risk Example" />
    </div>
  );
}
