import {
  Form,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  useNavigation,
  useLocation,
} from "react-router";
import type { Route } from "./+types/user";

export function meta({ data }: Route.MetaArgs) {
  const { first_name, last_name } = data;
  return [{ title: `User - ${first_name} ${last_name}` }];
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ResponseData {
  data: User;
}
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.user) throw new Error("Missing User ID");
  const url = `https://reqres.in/api/users/${params.user}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch user data");

  const { data }: ResponseData = await response.json();
  return data;
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.user) throw new Error("Missing User ID");
  const url = `https://reqres.in/api/users/${params.user}?delay=1`;

  const formData = Object.fromEntries((await request.formData()).entries());

  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Failed to update user data");

  const data = await response.json();
  return { data };
}

interface ServerDataProps {
  data: User;
}
function ServerData({ data }: ServerDataProps) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

interface ServerActionProps {
  defaultValue: User;
}
function ServerAction({ defaultValue }: ServerActionProps) {
  const { formAction } = useNavigation();
  const { pathname } = useLocation();

  const isSubmitting = formAction === pathname;
  const disabled = isSubmitting;

  const { first_name, last_name } = defaultValue;

  return (
    <Form method="post" action={pathname}>
      <input name="first_name" defaultValue={first_name} disabled={disabled} />
      <input name="last_name" defaultValue={last_name} disabled={disabled} />
      <button type="submit" disabled={disabled}>
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </Form>
  );
}

export default function User({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <>
      <ServerData data={loaderData} />
      <ServerAction defaultValue={loaderData} />
      <pre>{JSON.stringify(actionData, null, 2)}</pre>
    </>
  );
}
