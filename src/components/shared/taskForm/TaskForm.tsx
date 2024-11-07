import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useForm } from "../../../hooks/useForm";

type TaskFormProps = {
  editTaskId: string;
};

const TaskForm = ({ editTaskId }: TaskFormProps) => {
  const { onSubmitHandler, title, description, showMessage } =
    useForm(editTaskId);

  return (
    <form onSubmit={onSubmitHandler}>
      <TextField label="Title" required {...title} />
      <TextField label="Description" multiline rows={4} {...description} />
      <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginTop: 15 }}>
        <Stack style={{ width: "85%" }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>
              {showMessage.message}
            </MessageBar>
          )}
        </Stack>
        <Stack style={{ width: "25%" }}>
          <PrimaryButton
            text={editTaskId ? "Update Task" : "Add Task"}
            type="submit"
            allowDisabledFocus
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
