
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTask } from '../../store/features/tasks/tasksSlice.js';
import TaskForm from '../shared/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useState } from 'react';
const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const task = useSelector(state =>
    state.tasks.tasks.find(task => task.id === id)
  );

  const groups = useSelector(state => state.tasks.groups);

  const handleDelete = () => {
    dispatch(deleteTask(id));
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
      variant: "destructive",
    });
    navigate('/');
  };

  if (!task) {
    return <div className='text-center flex items-center justify-center mx-auto text-4xl  text-black'>Task not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/')} className="mb-4">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>Group: {groups.find(g => g.id === task.groupId)?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{task.description}</p>
          <div className="mt-4">
            <p>Estimated Hours: {task.estimatedHours}</p>
            <p>Progress: {task.progress}%</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <PencilIcon className="mr-2 h-4 w-4" /> Edit Task
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <TrashIcon className="mr-2 h-4 w-4" /> Delete Task
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
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      {isEditing && (
        <TaskForm
          task={task}
          groups={groups}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  )
}

export default TaskDetails