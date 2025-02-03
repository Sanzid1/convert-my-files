import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ConversionProgressProps {
  progress: number;
}

const ConversionProgress = ({ progress }: ConversionProgressProps) => {
  return (
    <div className="w-full max-w-xl space-y-2">
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-center text-gray-500">
        Converting... {progress}%
      </p>
    </div>
  );
};

export default ConversionProgress;