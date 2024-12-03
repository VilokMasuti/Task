import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/shared/Dashboard';
import { Toaster } from './components/ui/toaster';
import TaskDetails from './components/shared/TaskDetails';
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App