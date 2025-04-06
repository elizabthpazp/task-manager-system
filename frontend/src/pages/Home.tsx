import { Box, Button, Container, Typography } from "@mui/material";
import AddTaskDialog from "../components/AddTaskDialog";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { Task } from '../types'
import { AppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
 
  const handleAddTask = async (task: Task) => {
    try { 
      await dispatch(addTask(task)); 
      setOpen(false);   
    } catch (error) {
      console.error('Error add task:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ color: "info.main" }}>
            To-do list  
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: "20px" }}
          >
            + New Task
          </Button>
        </Box>

        <AddTaskDialog open={open} onClose={() => setOpen(false)} onSave={handleAddTask} /> 
        <TaskList />  
      </Container>
    </>
  );
};

export default Home;
