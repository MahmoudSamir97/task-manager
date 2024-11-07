import { Pivot, PivotItem } from "@fluentui/react";
import TaskForm from "../taskForm/TaskForm";
import TaskList from "../taskList/TaskList";
import CompletedTaskList from "../completedTaskList/CompletedTaskList";
import { PivotKeysEnum } from "../../../types/pivot.types";
import styles from "../../../pages/home/styles.module.css";

type PivotContainerProps = {
  editTask: (id: string) => void;
  selectedKey: string;
  editTaskId: string;
  setEditTaskId: (value: string) => void;
  setSelectedKey: (value: string) => void;
};

const PivotContainer = ({
  editTask,
  selectedKey,
  editTaskId,
  setEditTaskId,
  setSelectedKey,
}: PivotContainerProps) => {
  return (
    <div className={styles.pivotContainer}>
      <Pivot
        aria-label="Override Selected Item Pivot Example"
        selectedKey={String(selectedKey)}
        styles={{ root: { display: "flex", justifyContent: "center" } }}
        onLinkClick={(item?: PivotItem) => {
          if (item?.props.itemKey !== PivotKeysEnum.TaskForm) {
            setEditTaskId("");
          }
          setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
        }}
      >
        <PivotItem headerText="Tasks" itemKey={PivotKeysEnum.Tasks}>
          <TaskList setEditTask={editTask} />
        </PivotItem>
        <PivotItem headerText="Task Form" itemKey={PivotKeysEnum.TaskForm}>
          <TaskForm editTaskId={editTaskId} />
        </PivotItem>
        <PivotItem headerText="Completed" itemKey={PivotKeysEnum.Completed}>
          <CompletedTaskList />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default PivotContainer;
