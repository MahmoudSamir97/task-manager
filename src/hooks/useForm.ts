import { useEffect, useState } from "react";
import { TaskType, TShowMessageState } from "../types/shared";
import { MessageBarType } from "@fluentui/react";
import { useInput } from "./useInput";
import { useTask } from "../context/TaskProvider";

const useForm = (editTaskId: string) => {
  const [showMessage, setShowMessage] = useState<TShowMessageState>({
    type: MessageBarType.success,
    message: "",
  });

  // create separate hook instance for each state.
  const title = useInput();
  const description = useInput();
  const { dispatch, activeTasks } = useTask();

  const updateTaskAction = () => {
    const taskData = activeTasks.find((task) => {
      return task.id === editTaskId;
    });
    if (taskData) {
      const data: TaskType = {
        id: taskData.id,
        title: title.value,
        description: description.value,
      };
      dispatch({ type: "update", data });
      setShowMessage({
        type: MessageBarType.success,
        message: "Task updated successfully",
      });
    } else {
      setShowMessage({
        type: MessageBarType.error,
        message: "Error updating the task",
      });
    }
    title.set("");
    description.set("");
  };

  const addTaskAction = () => {
    setShowMessage({
      type: MessageBarType.success,
      message: "Task added successfully",
    });

    const data: TaskType = {
      id: "",
      title: title.value,
      description: description.value,
    };
    dispatch({ type: "add", data });
    title.set("");
    description.set("");
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (editTaskId) {
      updateTaskAction();
    } else {
      addTaskAction();
    }
  };

  useEffect(() => {
    const taskData = activeTasks.find((el) => {
      return el.id === editTaskId;
    });
    if (taskData) {
      title.set(taskData.title);
      description.set(taskData.description || "");
    }
  }, [editTaskId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage({ type: MessageBarType.success, message: "" });
    }, 1000);
    //cleanup function to prevent memory leak
    return () => clearTimeout(timeoutId);
  }, [showMessage.message]);

  return { onSubmitHandler, title, description, showMessage };
};

export { useForm };
