import axios from 'axios';
import { Task } from '../types';

const API_URL = 'https://mm4adbj7u7.execute-api.us-east-2.amazonaws.com/default/task-manager';
 
export const getTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("token");
 
  if (!token) {
    console.error("No token found. Please log in.");
    return [];
  }
 
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  } 
};

export const createTask = async (task: Task) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Please log in.");
    return;
  }

  try { 
    const taskWithId = {
      ...task,
      id: task.id || "", 
    };

    const response = await axios.post(API_URL, taskWithId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};


export const updateTaskAPI = async (task: Task) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Please log in.");
    return;
  }

  try {
    await axios.put(`${API_URL}`, task, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }); 
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTaskAPI = async (task: Task) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Please log in.");
    return;
  }

  try {
     await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      data: task, 
    }); 
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

