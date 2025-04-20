"use client";

import { useActionState } from "react";
import NextForm from "next/form";
import { updateUser } from "./actions";
import { useOptimisticContext } from "./optimistic";
import { FormHelper } from "./_components/form-helper";
import { TextInput } from "@/components/text-input";

const formDataName = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
} as const;

const initialState = {
  success: "",
  error: undefined,
  errors: undefined,
};

export function UserProfile() {
  const [state, formAction, isPending] = useActionState(
    updateUser,
    initialState,
  );

  const { optimistic: value, updateOptimistic } = useOptimisticContext();

  const { success, error, errors } = state;

  const disabled = isPending;
  const submitLabel = isPending ? "Loading" : "Update";

  const formMessage = success || error || "_";

  const optimisticAction = (data: FormData) => {
    const firstName = data.get(formDataName.firstName) as string;
    const lastName = data.get(formDataName.lastName) as string;
    const name = `${firstName} ${lastName}`;
    const email = data.get(formDataName.email) as string;

    updateOptimistic({ name, firstName, lastName, email });
    formAction(data);
  };

  return (
    <>
      <b>{formMessage}</b>
      <NextForm action={optimisticAction}>
        <TextInput
          name={formDataName.firstName}
          label="First name"
          disabled={disabled}
          message={errors?.firstName}
          value={value.firstName}
        />
        <TextInput
          name={formDataName.lastName}
          label="Last name"
          disabled={disabled}
          message={errors?.lastName}
          value={value.lastName}
        />
        <TextInput
          name={formDataName.email}
          label="Email"
          disabled={disabled}
          message={errors?.email}
          value={value.email}
        />
        <button type="submit" disabled={disabled}>
          {submitLabel}
        </button>
      </NextForm>
      <FormHelper />
    </>
  );
}
