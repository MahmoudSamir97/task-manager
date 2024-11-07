import { MessageBarType } from "@fluentui/react";
import { Dispatch } from "react";

export type TaskType = {
  id: string;
  description?: string;
  title: string;
};

export type TInitialState = {
  activeTasks: TaskType[];
  completedTasks: TaskType[];
};

export type TShowMessageState = {
  type: MessageBarType;
  message: string;
};

export type TAction =
  | { type: "add"; data: TaskType }
  | { type: "remove"; id: string }
  | { type: "update"; data: TaskType }
  | { type: "completed"; id: string }
  | { type: "removeCompletedTask"; id: string };

export interface ITaskContext {
  activeTasks: TaskType[];
  completedTasks: TaskType[];
  dispatch: Dispatch<TAction>;
}
