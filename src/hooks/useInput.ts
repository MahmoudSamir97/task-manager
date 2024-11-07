import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.currentTarget.value);
  };

  const set = (data: string) => {
    setValue(data);
  };

  return { value, set, onChange };
};

export { useInput };
