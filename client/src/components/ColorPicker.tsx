import React, { ReactNode } from "react";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  color, 
  onChange, 
  disabled = false,
  children 
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-white font-medium">{label}</label>
        <span className="text-xs font-mono bg-[#1F3A41] px-2 py-1 rounded">
          {color.toUpperCase()}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="color-picker-wrapper flex-1">
          <input 
            type="color" 
            value={color} 
            className="rounded"
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div 
          className="color-preview w-10 h-10 rounded" 
          style={{ backgroundColor: color }}
        />
      </div>
      {children}
    </div>
  );
};

export default ColorPicker;
