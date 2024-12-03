/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateTaskProgress } from '../../store/features/tasks/tasksSlice.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TaskProgress from './TaskProgress';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

function TaskGroup({ group, tasks }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalHours = tasks.reduce((acc, task) => acc + task.estimatedHours, 0);
  const completedHours = tasks.reduce((acc, task) => acc + (task.estimatedHours * task.progress / 100), 0);

  const handleProgressUpdate = (taskId, newProgress) => {
    dispatch(updateTaskProgress({ id: taskId, progress: newProgress }));
    toast({
      title: "Task progress updated",
      description: `Task progress has been set to ${newProgress}%`,
    });
  };

  return (
    <Card className="bg-gray-800 border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${group.color}`} />
            {group.name}
          </div>
        </CardTitle>
        <span className="text-sm text-gray-400">{tasks.length} tasks</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <Link to={`/tasks/${task.id}`} className="font-medium text-white hover:underline">
                  {task.title}
                </Link>
                <span className="text-sm text-gray-400">{task.estimatedHours}h</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{task.description}</p>
              <div className="flex items-center gap-2">
                <TaskProgress
                  value={task.progress}
                  className="flex-grow h-1.5"
                  onChange={(newProgress) => handleProgressUpdate(task.id, newProgress)}
                />
                <span className="text-sm text-gray-400">{task.progress}%</span>
                <Link to={`/tasks/${task.id}`}>
                  <Button variant="ghost" size="sm">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Total Hours</span>
            <span>{completedHours.toFixed(1)} / {totalHours}h</span>
          </div>
          <TaskProgress
            value={(completedHours / totalHours) * 100}
            className="h-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskGroup;

