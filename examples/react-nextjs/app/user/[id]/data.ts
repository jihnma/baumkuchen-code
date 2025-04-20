"use server";

import { apiBaseUrl } from "@/lib/constants";
import { notFound } from "next/navigation";

type GetUserResponse = {
  data: {
    first_name: string;
    last_name: string;
    email: string;
  };
};
export async function getUser(id: string) {
  const url = `${apiBaseUrl}/users/${id}`;
  const res = await fetch(url);

  if (!res.ok) notFound();
  const { data } = (await res.json()) as GetUserResponse;

  const { first_name, last_name, email } = data;

  return {
    name: `${first_name} ${last_name}`,
    firstName: first_name,
    lastName: last_name,
    email,
  };
}
