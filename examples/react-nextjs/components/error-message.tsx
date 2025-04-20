import type { CSSProperties } from "react";

const errorStyle: CSSProperties = { color: "red" };

interface Props {
  message: string;
}
export function ErrorMessage({ message }: Props) {
  return (
    <span aria-live="polite" style={errorStyle}>
      {message}
    </span>
  );
}
