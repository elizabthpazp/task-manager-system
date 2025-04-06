import { Typography, Grid } from "@mui/material";
import TaskCard from "./TaskCard";
import AddTaskDialog from "./AddTaskDialog";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteTask, fetchTasks, updateTask } from "../redux/taskSlice";
import { Task } from '../types'

const TaskList: React.FC = () => { 
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = (task: Task) => {
    dispatch(deleteTask(task));
  };

  const handleSave = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchTasks()); 
  }, [dispatch]);

  return (
    <>
      {tasks.length === 0 && (
        <Typography variant="h6" gutterBottom>
          There are no tasks yet
        </Typography>
      )}

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={task.id}
            component={"div" as React.ElementType}
          >
            <TaskCard
              task={task}
              onDelete={() => handleDelete(task)}
              onUpdate={() => handleEdit(task)}
            />
          </Grid>
        ))}
      </Grid>

      <AddTaskDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(updatedTask) => handleSave(updatedTask)}
        taskToEdit={selectedTask}
      />
    </>
  );
};

export default TaskList;