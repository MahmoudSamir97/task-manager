import { Checkbox, FontIcon, MessageBar, Stack } from "@fluentui/react";
import TaskDescription from "../taskDescription/TaskDescription";
import { useTask } from "../../../context/TaskProvider";
import styles from "../taskList/styles.module.css";
import { TaskType } from "../../../types/shared";

const CompletedTaskList = () => {
  const { completedTasks, dispatch } = useTask();

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are You sure want to delete completed task?")) {
      dispatch({ type: "removeCompletedTask", id });
    }
  };

  const completedTasksMap = completedTasks.map((el: TaskType) => {
    return (
      <Stack horizontal className={styles.taskItem} key={el.id}>
        <Stack horizontal style={{ width: "85%" }}>
          <Checkbox disabled />
          {el.title}
        </Stack>
        <Stack horizontal style={{ width: "15%" }}>
          <TaskDescription task={el} />

          <FontIcon
            iconName="Delete"
            className={styles.iconStyle}
            onClick={() => onDeleteHandler(el.id)}
          />
        </Stack>
      </Stack>
    );
  });

  return (
    <div>
      {completedTasksMap.length ? (
        completedTasksMap
      ) : (
        <MessageBar>No completed tasks to show</MessageBar>
      )}
    </div>
  );
};

export default CompletedTaskList;
