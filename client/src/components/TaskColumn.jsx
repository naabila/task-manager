import React from 'react';
import TaskCard from './TaskCard';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskColumn({ category, tasks, deleteTask }) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl p-5 space-y-4">
      <h2 className="text-lg font-bold mb-4">{category}</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <SortableTaskCard key={task._id} task={task} deleteTask={deleteTask} />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </div>
  );
}

// Wrapper component for draggable TaskCard
function SortableTaskCard({ task, deleteTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <div style={{touchAction:"none"}}>
    <TaskCard data={task} deleteTask={deleteTask} />
    </div>
      
    </div>
  );
}

export default TaskColumn;