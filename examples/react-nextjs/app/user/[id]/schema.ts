import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

vine.convertEmptyStringsToNull = true;

const schema = vine.object({
  firstName: vine.string().nullable(),
  lastName: vine.string().minLength(3),
  email: vine.string().email(),
});

export type UserFormData = Infer<typeof schema>;

const messagesProvider = new SimpleMessagesProvider({
  required: "{{ field }} is required.",
  minLength: "It should have at least {{ min }} characters.",
  email: "The value is not a valid email address.",
});

export async function validate(data: UserFormData) {
  const validator = vine.compile(schema);
  return await validator.validate(data, { messagesProvider });
}
