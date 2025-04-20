"use server";

import { errors } from "@vinejs/vine";
import { formDataErrorsToObject, formDataToObject } from "@/lib/form-handler";
import { apiBaseUrl, apiResponseMessages } from "@/lib/constants";
import { ApiResponseError } from "@/lib/errors";
import { validate, type UserFormData } from "./schema";

export async function updateUser(_prev: any, data: FormData) {
  try {
    const result = await validate(formDataToObject<UserFormData>(data));

    // For demonstration purposes, if the firstName is null, we return a server error.
    const password = result.firstName ? "pistol" : "";

    const url = `${apiBaseUrl}/register`;
    const init = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "eve.holt@reqres.in", password }),
    };

    const res = await fetch(url, init);

    if (!res.ok) throw new ApiResponseError(apiResponseMessages[res.status]);

    // TODO: revalidate path
    // revalidatePath("/user/:id");

    return { success: apiResponseMessages[res.status] };
  } catch (error) {
    switch (true) {
      case error instanceof errors.E_VALIDATION_ERROR:
        return {
          error: "Validation error",
          errors: formDataErrorsToObject<UserFormData>(error.messages),
        };

      case error instanceof ApiResponseError:
        return { error: error.message };

      default:
        throw error;
    }
  }
}
