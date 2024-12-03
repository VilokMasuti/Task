/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../store/features/tasks/tasksSlice.js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '../../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function TaskForm({ task, onClose, groups }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [groupId, setGroupId] = useState(task ? task.groupId : (groups && groups.length > 0 ? groups[0].id : ''));
  const [estimatedHours, setEstimatedHours] = useState(task ? task.estimatedHours : 1);
  const [progress, setProgress] = useState(task ? task.progress : 0);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      dispatch(editTask({ id: task.id, title, description, groupId, estimatedHours, progress }));
      toast({
        title: "Task updated",
        description: "The task has been successfully updated.",
      });
    } else {
      dispatch(addTask({ title, description, groupId, estimatedHours, progress }));
      toast({
        title: "Task added",
        description: "A new task has been successfully added.",
      });
    }
    onClose();
  };

  if (!groups || groups.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogDescription>
            {task ? 'Edit the details of your task.' : 'Fill in the details for your new task.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
          />
          <Select value={groupId} onValueChange={setGroupId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(Number(e.target.value))}
            placeholder="Estimated hours"
            min="0"
            step="0.5"
            required
          />
          <Input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            placeholder="Progress (%)"
            min="0"
            max="100"
            required
          />
          <DialogFooter>
            <Button type="submit">{task ? 'Update Task' : 'Add Task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskForm;

