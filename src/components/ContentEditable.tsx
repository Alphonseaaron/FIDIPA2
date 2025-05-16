import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ContentEditableProps {
  content: string;
  isEditing: boolean;
  onChange?: (newContent: string) => void;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export default function ContentEditable({
  content,
  isEditing,
  onChange,
  className = '',
  tag: Tag = 'div'
}: ContentEditableProps) {
  const [editableContent, setEditableContent] = useState(content);
  const contentRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const handleBlur = () => {
    if (onChange && contentRef.current) {
      onChange(contentRef.current.innerText);
    }
  };

  const handleInput = () => {
    if (contentRef.current) {
      setEditableContent(contentRef.current.innerText);
    }
  };

  const handleClick = () => {
    if (isEditing && contentRef.current) {
      // Create a range and selection
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <Tag
      ref={contentRef}
      contentEditable={isEditing}
      onBlur={handleBlur}
      onInput={handleInput}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      suppressContentEditableWarning
      className={`${className} ${
        isEditing 
          ? 'outline-none border border-primary/30 rounded px-2 py-1 focus:border-primary focus:ring-2 focus:ring-primary/20 relative group cursor-text'
          : ''
      }`}
    >
      {editableContent}
      {isEditing && isHovered && !contentRef.current?.matches(':focus') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          Click to edit
        </motion.div>
      )}
    </Tag>
  );
}