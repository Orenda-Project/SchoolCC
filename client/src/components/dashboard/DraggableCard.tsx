import { ReactNode, DragEvent, useState } from 'react';
import { GripVertical } from 'lucide-react';

interface DraggableCardProps {
  id: string;
  children: ReactNode;
  onDragStart: (id: string) => void;
  onDrop: (targetId: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export function DraggableCard({
  id,
  children,
  onDragStart,
  onDrop,
  onDragEnd,
  isDragging,
}: DraggableCardProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    onDragStart(id);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (!isDragging) {
      setIsOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    onDrop(id);
  };

  const handleDragEnd = () => {
    setIsOver(false);
    onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`relative group transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      } ${isOver && !isDragging ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      data-testid={`draggable-card-${id}`}
    >
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded p-1 shadow-sm">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      {children}
    </div>
  );
}
