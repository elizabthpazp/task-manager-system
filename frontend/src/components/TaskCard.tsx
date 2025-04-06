import { Card, CardContent, Typography, Chip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material"; 
import { Task } from '../types'
interface TaskProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, onDelete, onUpdate }) => {
  return (
    <Card
      sx={{
        m: 2,
        p: 2,
        borderRadius: "20px",
        borderLeft: `5px solid ${
          task.status === "done"
            ? "green"
            : task.status === "in progress"
            ? "orange"
            : "#0288d1"
        }`,
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography color="textSecondary">{task.description}</Typography>
        <Chip
          label={task?.status?.toUpperCase()}
          color={
            task.status === "done"
              ? "success"
              : task.status === "in progress"
              ? "warning"
              : "info"
          }
          sx={{ mt: 1 }}
        />
        <IconButton color="primary" onClick={() => onUpdate(task)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(task.id)}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
