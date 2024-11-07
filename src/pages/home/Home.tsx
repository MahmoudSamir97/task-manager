import { useState } from "react";
import { Stack } from "@fluentui/react";
import { PivotKeysEnum } from "../../types/pivot.types";
import { TaskProvider } from "../../context/TaskProvider";
import noteIcon from "../../assets/note.png";
import PivotContainer from "../../components/shared/pivotContainer/PivotContainer";
// fluentui icon implementation
import { initializeIcons } from "@fluentui/font-icons-mdl2";
initializeIcons();
// fluentui icon implementation

import styles from "./styles.module.css";
const { mainContainer, headerContainer, noteImg } = styles;

const Home = () => {
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.Tasks);
  const [editTaskId, setEditTaskId] = useState<string>("");

  const editTask = (id: string) => {
    setEditTaskId(id);
    setSelectedKey(PivotKeysEnum.TaskForm);
  };

  return (
    <TaskProvider>
      <Stack className={mainContainer}>
        <Stack>
          <div className={headerContainer}>
            <h2>Task Manager</h2>
            <img className={noteImg} src={noteIcon} alt="note" />
          </div>
        </Stack>
        <PivotContainer
          editTask={editTask}
          selectedKey={selectedKey}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
          setSelectedKey={setSelectedKey}
        />
      </Stack>
    </TaskProvider>
  );
};

export default Home;
