const TASK_STATUSES = ["to do", "in progress", "done"] as const;

type TaskStatus = (typeof TASK_STATUSES)[number];

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export { type Task };
