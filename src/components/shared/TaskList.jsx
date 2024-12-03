/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import { toggleTaskCompletion, deleteTask } from '../../store/features/tasks/tasksSlice';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { TrashIcon, PencilIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

function TaskList({ tasks }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleToggleCompletion = (id) => {
    dispatch(toggleTaskCompletion(id));
    toast({
      title: "Task status updated",
      description: "The task completion status has been toggled.",
    });
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <Card key={task.id} className={`${task.completed ? 'bg-green-50' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => handleToggleCompletion(task.id)}
              />
              <span className={`ml-2 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </span>
            </CardTitle>
            <CardDescription>{new Date(task.dueDate).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{task.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to={`/tasks/${task.id}`}>
              <Button variant="outline" size="sm">
                <PencilIcon className="mr-2 h-4 w-4" /> Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <TrashIcon className="mr-2 h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default TaskList;

