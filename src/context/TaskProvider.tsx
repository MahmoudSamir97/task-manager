import { createContext, useContext, useReducer } from "react";
import { ITaskContext, TAction, TInitialState } from "../types/shared";

type TaskProviderProps = {
  children: React.ReactNode;
};

const TaskContext = createContext<ITaskContext>({
  activeTasks: [],
  completedTasks: [],
  dispatch: () => {},
});

const completedTaskAction = (state: TInitialState, id: string) => {
  const completedTaskData = state.activeTasks.find((task) => task.id === id);
  const filteredData = state.activeTasks.filter((task) => task.id !== id);
  return {
    activeTasks: filteredData,
    completedTasks: completedTaskData
      ? [completedTaskData, ...state.completedTasks]
      : state.completedTasks,
  };
};

const deleteCompletedTaskAction = (state: TInitialState, id: string) => {
  const filteredTasks = state.completedTasks.filter((task) => {
    return task.id !== id;
  });
  return filteredTasks;
};

const reducer = (state: TInitialState, action: TAction): TInitialState => {
  switch (action.type) {
    case "add": {
      action.data.id = new Date().toJSON();
      return { ...state, activeTasks: [action.data, ...state.activeTasks] };
    }
    case "remove": {
      const filteredTasks = state.activeTasks.filter((task) => {
        return task.id !== action.id;
      });
      return { ...state, activeTasks: filteredTasks };
    }
    case "update": {
      const taskIndex = state.activeTasks.findIndex(
        (x) => x.id === action.data.id
      );
      if (taskIndex === -1) return state;
      // Create a new array with the updated task
      const updatedTasks = [
        ...state.activeTasks.slice(0, taskIndex),
        action.data,
        ...state.activeTasks.slice(taskIndex + 1),
      ];

      return { ...state, activeTasks: updatedTasks };
    }
    case "completed": {
      const data = completedTaskAction(state, action.id);
      return {
        ...state,
        activeTasks: data.activeTasks,
        completedTasks: data.completedTasks,
      };
    }
    case "removeCompletedTask": {
      return {
        ...state,
        completedTasks: deleteCompletedTaskAction(state, action.id),
      };
    }
    default:
      return { ...state };
  }
};

const TaskProvider = ({ children }: TaskProviderProps) => {
  const initialState: TInitialState = {
    activeTasks: [],
    completedTasks: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TaskContext.Provider
      value={{
        activeTasks: state.activeTasks,
        completedTasks: state.completedTasks,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTask };
