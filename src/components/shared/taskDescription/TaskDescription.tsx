import { FontIcon, TeachingBubble } from "@fluentui/react";
import { TaskType } from "../../../types/shared";
import { useBoolean, useId } from "@fluentui/react-hooks";
import styles from "../taskList/styles.module.css";

type TaskDescriptionProps = {
  task: TaskType;
};

const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);

  const buttonId = useId("targetButton");

  return (
    <div>
      <FontIcon
        id={buttonId}
        iconName="info"
        className={styles.iconStyle}
        onClick={task.description ? toggleTeachingBubbleVisible : () => {}}
      />
      {teachingBubbleVisible && task.description && (
        <TeachingBubble
          target={`#${buttonId}`}
          headline={task.title}
          onDismiss={toggleTeachingBubbleVisible}
        >
          {task.description}
        </TeachingBubble>
      )}
    </div>
  );
};

export default TaskDescription;
