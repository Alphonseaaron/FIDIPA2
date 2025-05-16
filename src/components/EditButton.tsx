import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditButtonProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
}

export default function EditButton({ isEditing, onToggleEdit, onSave }: EditButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-24 right-8 z-50 flex items-center space-x-2"
    >
      {isEditing && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors flex items-center space-x-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Save size={24} />
          {isHovered && (
            <span className="text-sm whitespace-nowrap">Save Changes</span>
          )}
        </motion.button>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleEdit}
        className={`p-4 rounded-full shadow-lg transition-colors flex items-center space-x-2 ${
          isEditing 
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-primary hover:bg-primary/90 text-white'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isEditing ? <X size={24} /> : <Edit2 size={24} />}
        {isHovered && (
          <span className="text-sm whitespace-nowrap">
            {isEditing ? 'Cancel Editing' : 'Edit Content'}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}