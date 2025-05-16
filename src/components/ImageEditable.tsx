import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageEditableProps {
  src: string;
  alt: string;
  isEditing: boolean;
  onChange?: (newSrc: string) => void;
  className?: string;
  onUpload?: (file: File) => Promise<string>;
}

export default function ImageEditable({
  src,
  alt,
  isEditing,
  onChange,
  className = '',
  onUpload
}: ImageEditableProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // If onUpload is provided, use it to get the new URL
      if (onUpload) {
        const newUrl = await onUpload(file);
        onChange?.(newUrl);
      } else {
        // Fallback to local URL if no upload handler
        const url = URL.createObjectURL(file);
        onChange?.(url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
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
      <img 
        src={preview || src} 
        alt={alt} 
        className={`${className} ${isEditing ? 'filter brightness-75' : ''}`}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 flex items-center justify-center bg-black/50"
      >
        <label className="cursor-pointer flex flex-col items-center">
          {uploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Upload size={32} className="text-white mb-2" />
              <span className="text-white text-sm">Click to change image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </motion.div>

      {preview && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPreview(null);
          }}
        >
          <X size={16} />
        </motion.button>
      )}
    </div>
  );
}