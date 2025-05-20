import React, { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageSelect: (dataUrl: string) => void;
  currentImage: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImage }) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle file selection
  const handleFile = useCallback((file: File) => {
    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPG or PNG image",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Create a FileReader to read the file
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelect(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelect, toast]);
  
  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);
  
  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);
  
  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  // Handle click on the dropzone to open file picker
  const handleBrowseClick = () => {
    const fileInput = document.getElementById('backgroundImageInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging ? 'border-primary bg-dark-DEFAULT/30' : 'border-dark-lighter'
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      {currentImage ? (
        <div className="space-y-4">
          <div className="relative w-full h-40 overflow-hidden rounded">
            <img 
              src={currentImage} 
              alt="Background preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-light-DEFAULT text-sm">Click "Browse Files" to select a different image</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-light-DEFAULT/70">
            <i className="fas fa-image text-3xl"></i>
          </div>
          <p className="text-light-DEFAULT mb-2">Drag and drop an image here</p>
          <p className="text-light-DEFAULT/70 text-sm mb-4">or</p>
        </>
      )}
      
      <input 
        id="backgroundImageInput"
        type="file" 
        accept="image/jpeg,image/jpg,image/png" 
        className="hidden"
        onChange={handleFileInputChange}
      />
      
      <button 
        onClick={handleBrowseClick}
        className="bg-secondary-DEFAULT hover:bg-secondary-dark text-light-DEFAULT px-4 py-2 rounded transition-colors duration-200"
      >
        Browse Files
      </button>
      
      <p className="text-light-DEFAULT/70 text-xs mt-4">Recommended size: 1920×1080px (JPG, PNG)</p>
    </div>
  );
};

export default ImageUpload;
