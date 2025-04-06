import { Container, Typography } from "@mui/material";
import TaskChart from "../components/TaskChart";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ color: "info.main" }} fontFamily="sans-serif" textAlign="center">📊 Task Dashboard</Typography>
        <TaskChart tasks={tasks} />
      </Container>
    </>
  );
};

export default Dashboard;
