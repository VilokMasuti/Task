import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  groups: [
    { id: 'g1', name: 'Development', color: 'bg-purple-500' },
    { id: 'g2', name: 'Design', color: 'bg-blue-500' },
    { id: 'g3', name: 'Marketing', color: 'bg-green-500' }
  ],
  filter: 'all',
  searchTerm: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ title, description, groupId, estimatedHours, progress }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            groupId,
            estimatedHours,
            progress: progress || 0,
            createdAt: new Date().toISOString(),
            status: 'in-progress'
          },
        };
      },
    },
    editTask: (state, action) => {
      const { id, title, description, groupId, estimatedHours, progress } = action.payload;
      const existingTask = state.tasks.find(task => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.groupId = groupId;
        existingTask.estimatedHours = estimatedHours;
        existingTask.progress = progress;
        if (progress === 100) {
          existingTask.status = 'completed';
        } else {
          existingTask.status = 'in-progress';
        }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskProgress: (state, action) => {
      const { id, progress } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.progress = progress;
        if (progress === 100) {
          task.status = 'completed';
        } else {
          task.status = 'in-progress';
        }
      }
    },
    addGroup: {
      reducer(state, action) {
        state.groups.push(action.payload);
      },
      prepare({ name, color }) {
        return {
          payload: {
            id: nanoid(),
            name,
            color,
          },
        };
      },
    },
  },
});

export const { addTask, editTask, deleteTask, updateTaskProgress, addGroup } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectTasksByGroup = (state) => {
  const groups = {};
  state.tasks.tasks.forEach(task => {
    if (!groups[task.groupId]) {
      groups[task.groupId] = [];
    }
    groups[task.groupId].push(task);
  });
  return groups;
};

