import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageEditableProps {
  src: string;
  alt: string;
  isEditing: boolean;
  onChange?: (newSrc: string) => void;
  className?: string;
}

export default function ImageEditable({
  src,
  alt,
  isEditing,
  onChange,
  className = ''
}: ImageEditableProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onChange) {
      // In a real app, you would upload the file to your server/storage
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  if (!isEditing) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt={alt} className={`${className} ${isEditing ? 'filter brightness-75' : ''}`} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 flex items-center justify-center bg-black/50"
      >
        <label className="cursor-pointer flex flex-col items-center">
          <Upload size={32} className="text-white mb-2" />
          <span className="text-white text-sm">Click to change image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </motion.div>
    </div>
  );
}