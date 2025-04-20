import type { Route } from "./+types/users";
import { Link } from "react-router";

export function meta() {
  return [{ title: "Users" }];
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ResponseData {
  data: User[];
}
export async function loader() {
  const url = "https://reqres.in/api/users";

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch users data");

  const { data }: ResponseData = await response.json();
  return data;
}

interface LinkListProps {
  urls: { url: string; label: string }[];
}
function LinkList({ urls }: LinkListProps) {
  return (
    <ul>
      {urls.map(({ url, label }) => (
        <li key={url}>
          <Link to={url}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Users({ loaderData }: Route.ComponentProps) {
  const urls = loaderData.map(({ id, first_name, last_name }) => ({
    url: `/users/${id}`,
    label: `${first_name} ${last_name}`,
  }));
  return <LinkList urls={urls} />;
}
