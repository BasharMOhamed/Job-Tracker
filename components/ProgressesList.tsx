import React from "react";
import { Progress } from "./ui/progress";

const ProgressesList = () => {
  return (
    <div className="space-y-6">
      <ProgressComponent
        title="Application-to-Interview Rate"
        value={15}
        color="orange"
      />
      <ProgressComponent
        title="Interview-to-Offer Rate"
        value={67}
        color="green"
      />
      <ProgressComponent
        title="Overall Success Rate"
        value={10}
        color="purple"
      />
    </div>
  );
};

export default ProgressesList;

interface ProgressComponentProps {
  title: string;
  value: number;
  color: string;
}

const ProgressComponent = ({ title, value, color }: ProgressComponentProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm">{title}</h3>
        <span style={{ color: color }} className={`font-bold text-lg`}>
          {value}%
        </span>
      </div>
      <Progress value={value} className={`w-[${value}%]`} color={color} />
    </div>
  );
};
