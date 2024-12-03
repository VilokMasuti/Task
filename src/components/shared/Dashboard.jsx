import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectTasksByGroup } from '../../store/features/tasks/tasksSlice';
import TaskGroup from './TaskGroup';
import TaskProgress from './TaskProgress';
import TaskForm from './TaskForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, BarChart2Icon, ListTodoIcon, CheckCircleIcon } from 'lucide-react';

function Dashboard() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const tasksByGroup = useSelector(selectTasksByGroup);
  const groups = useSelector(state => state.tasks.groups);
  const dispatch = useDispatch();

  const totalTasks = useSelector(state => state.tasks.tasks.length);
  const completedTasks = useSelector(
    state => state.tasks.tasks.filter(t => t.status === 'completed').length
  );

  useEffect(() => {
    const savedState = localStorage.getItem('taskState');
    if (savedState) {
      dispatch({ type: 'tasks/setState', payload: JSON.parse(savedState) });
    }
  }, [dispatch]);

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Task Dashboard</h1>
            <p className="text-gray-400 mt-2">Track your team&apos;s progress in style</p>
          </div>
          <Button onClick={handleAddTask} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            <PlusIcon className="mr-2 h-4 w-4" /> New Task
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            <motion.div
              key="total-progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2Icon className="mr-2 h-5 w-5" />
                    Total Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-2">
                    {totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                  </div>
                  <TaskProgress
                    value={totalTasks ? (completedTasks / totalTasks) * 100 : 0}
                    className="h-3"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              key="active-tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/75 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ListTodoIcon className="mr-2 h-5 w-5" />
                    Active Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold">
                    {totalTasks - completedTasks}
                  </div>
                  <p className="text-gray-200 mt-2">Tasks in progress</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              key="completed-tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-cyan-600 to-green-600 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircleIcon className="mr-2 h-5 w-5" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold">{completedTasks}</div>
                  <p className="text-gray-200 mt-2">Tasks completed</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TaskGroup
                group={group}
                tasks={tasksByGroup[group.id] || []}
              />
            </motion.div>
          ))}
        </div>
      </div>
      {isAddingTask && (
        <TaskForm
          groups={groups}
          onClose={() => setIsAddingTask(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;

