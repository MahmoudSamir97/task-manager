import { Checkbox, FontIcon, MessageBar, Stack } from "@fluentui/react";
import { TaskType } from "../../../types/shared";
import styles from "./styles.module.css";
import { useTask } from "../../../context/TaskProvider";
import TaskDescription from "../taskDescription/TaskDescription";
const { taskItem, iconStyle } = styles;

type TaskListProps = {
  setEditTask: (id: string) => void;
};

const TaskList = ({ setEditTask }: TaskListProps) => {
  const { activeTasks, dispatch } = useTask();

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      dispatch({ type: "remove", id });
    }
  };

  const checkBoxClickHandler = (id: string) => {
    dispatch({ type: "completed", id });
  };

  const tasksMap = activeTasks.map((el: TaskType) => {
    return (
      <Stack horizontal className={taskItem} key={el.id}>
        <Stack horizontal style={{ width: "80%" }}>
          <Checkbox onChange={() => checkBoxClickHandler(el.id)} />
          {el.title}
        </Stack>
        <Stack horizontal style={{ width: "20%" }}>
          <TaskDescription task={el} />
          <FontIcon
            iconName="EditNote"
            className={iconStyle}
            onClick={() => setEditTask(el.id)}
          />
          <FontIcon
            iconName="Delete"
            className={iconStyle}
            onClick={() => onDeleteHandler(el.id)}
          />
        </Stack>
      </Stack>
    );
  });

  return (
    <div>
      {tasksMap.length ? tasksMap : <MessageBar>No Tasks to show</MessageBar>}
    </div>
  );
};

export default TaskList;
