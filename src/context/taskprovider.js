// src/context/TaskProvider.js
import React, { createContext, useReducer, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
const TaskContext = createContext();

// Storage key for AsyncStorage
const STORAGE_KEY = "TASKS_v1";

// Initial empty state
const initialState = [];

// Reducer to handle actions
function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload || [];
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  // Load tasks from AsyncStorage once on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          dispatch({ type: "SET", payload: JSON.parse(raw) });
        }
      } catch (e) {
        console.log("Load tasks error:", e);
      }
    })();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.log("Save tasks error:", e);
      }
    })();
  }, [tasks]);

  // Helper functions
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(), // unique id
      status: "Pending",         // default status
      ...task,
    };
    dispatch({ type: "ADD", payload: newTask });
    return newTask;
  };

  const updateTask = (task) => {
    dispatch({ type: "UPDATE", payload: task });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for easy usage
export const useTasks = () => useContext(TaskContext);
