import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FormatSelector = ({ value, onChange }: FormatSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="png">PNG</SelectItem>
        <SelectItem value="jpg">JPG</SelectItem>
        <SelectItem value="webp">WEBP</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FormatSelector;