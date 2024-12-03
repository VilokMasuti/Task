/* eslint-disable react/prop-types */

import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

function TaskProgress({ value, className, onChange }) {
  const handleClick = (e) => {
    if (onChange) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newValue = Math.round((x / rect.width) * 100);
      onChange(newValue);
    }
  };

  return (
    <div className={className} onClick={handleClick}>
      <Progress value={value}>
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </Progress>
    </div>
  );
}

export default TaskProgress;

