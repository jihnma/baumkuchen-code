export function formDataToObject<T>(data: FormData): T {
  return Object.fromEntries(data) as T;
}

interface FormFieldError {
  field: string;
  message: string;
}
export function formDataErrorsToObject<T>(errors: FormFieldError[]) {
  return Object.fromEntries(
    errors.map(({ field, message }) => [field, message]),
  ) as { [K in keyof T]: string };
}
