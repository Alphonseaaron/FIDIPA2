import React from 'react';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  onAdd?: () => void;
}

export default function AdminHeader({ title, onAdd }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors"
        >
          <Plus size={20} />
          <span>Add New</span>
        </button>
      )}
    </div>
  );
}