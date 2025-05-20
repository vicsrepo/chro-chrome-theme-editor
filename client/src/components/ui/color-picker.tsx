import React, { useRef } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleColorClick = () => {
    inputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Generate a contrasting border color
  const getBorderColor = () => {
    return isLightColor(color) ? 'border-dark-DEFAULT/30' : 'border-light-DEFAULT/20'; 
  };

  // Helper to determine if a color is light
  const isLightColor = (hex: string): boolean => {
    // Convert hex to RGB
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  return (
    <div 
      className={`color-picker h-10 w-10 rounded border-2 ${getBorderColor()} cursor-pointer relative`}
      style={{ backgroundColor: color }}
      onClick={handleColorClick}
    >
      <input 
        ref={inputRef}
        type="color" 
        value={color} 
        onChange={handleColorChange} 
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;
