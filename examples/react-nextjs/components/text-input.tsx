import { ErrorMessage } from "@/components/error-message";

interface Props {
  value: string;
  name: string;
  label: string;
  disabled: boolean;
  message?: string;
}
export function TextInput({ name, label, disabled, message, value }: Props) {
  return (
    <div>
      <input
        type="text"
        id={name}
        name={name}
        disabled={disabled}
        defaultValue={value}
      />
      <label htmlFor={name}> {label}</label>
      {message && <ErrorMessage message={message} />}
    </div>
  );
}
