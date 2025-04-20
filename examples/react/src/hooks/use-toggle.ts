import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Toggle the value
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  // Set to true
  const setTrue = useCallback(() => setValue(true), []);

  // Set to false
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse] as const;
}
