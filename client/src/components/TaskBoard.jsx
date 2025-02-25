import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter,TouchSensor, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TaskColumn from './TaskColumn';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loading from "../components/Loading"
function TaskBoard() {
  const axiosPublic = useAxiosPublic();
  const categories = ['To-Do', 'In Progress', 'Done'];

  // Fetch tasks
  const {
    isLoading,
    isError,
    data: tasks = [],
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/tasks');
      return data || []; // Ensure data is an array
    },
  });

  // State to manage tasks
  const [taskItems, setTaskItems] = useState(tasks);

  // Update taskItems when tasks are fetched
  useEffect(() => {
    if (tasks) {
      setTaskItems(tasks);
    }
  }, [tasks]);

  // Update task category in the backend
  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      await axiosPublic.patch(`/taskss/${taskId}`, { category: newCategory });
      toast.success('Task category updated successfully');
    } catch (error) {
      console.error('Error updating task category:', error);
      
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const { data } = await axiosPublic.delete(`/tasks/${taskId}`);

      if (data?.deletedCount > 0) {
        toast.success('Task deleted successfully');
        // Remove the deleted task from the local state
        setTaskItems((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } else {
        toast.error(data?.message || 'Could not delete the task');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Error deleting task');
    }
  };

  // Sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor,{
      activationConstraint: {
      distance: 10,
    }
    }),
    useSensor(KeyboardSensor,{
      activationConstraint: {
      distance: 10,
    }
    }),
    useSensor(TouchSensor,{
      activationConstraint: {
      distance: 10,
      delay: 150,
      tolerance: 5,
    }
    }),
  );

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTaskItems((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);

        // Update the category of the dragged task
        const updatedTask = { ...items[oldIndex], category: items[newIndex].category };
        const updatedItems = arrayMove(items, oldIndex, newIndex);
        updatedItems[newIndex] = updatedTask;

        // Call the updateTaskCategory function to update the backend
        updateTaskCategory(updatedTask._id, updatedTask.category);

        return updatedItems;
      });
    }
  };

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto">
      <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <SortableContext
            key={category}
            items={taskItems.filter((task) => task.category === category)}
            strategy={horizontalListSortingStrategy}
          >
            <TaskColumn
              category={category}
              tasks={taskItems.filter((task) => task.category === category)}
              deleteTask={deleteTask}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
    <Link to='/addtask'>
    <h1 className="font-bold text-[#DD001E] text-base my-5">Add more task</h1>
    </Link>
    </div>
  );
}

export default TaskBoard;