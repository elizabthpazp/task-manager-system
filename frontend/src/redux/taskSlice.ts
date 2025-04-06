import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';
import * as taskService from '../services/taskService';
 
export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const tasks = await taskService.getTasks(); 
    return tasks;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: Task) => {
    await taskService.createTask(newTask);  
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    await taskService.updateTaskAPI(updatedTask);  
    return updatedTask; 
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (task: Task) => {
    await taskService.deleteTaskAPI(task);
    return task;
  }
);

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error get';
      }) 
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })      
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error add';
      }) 
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error update';
      })
      // Eliminar tarea
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      })      
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error delete';
      });
  },
});

export default taskSlice.reducer;
