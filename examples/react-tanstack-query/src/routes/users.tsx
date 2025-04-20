import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Link } from "wouter";

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

// Query key for React Query cache
const queryKey = ["users"] as const;

// Function to fetch users from API
async function queryFn() {
  const url = "https://reqres.in/api/users";

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch users data");

  const { data }: ResponseData = await response.json();
  return data;
}

// Function to create a new user via API
async function mutationFn(formData: FormData) {
  const url = "https://reqres.in/api/users?delay=1";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) throw new Error("Failed to create user data");

  const { data }: ResponseData = await response.json();
  return data;
}

// Component to display list of users
export function UserList() {
  const query = useQuery({ queryKey, queryFn });
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {query.data?.map(({ id, email }) => (
          <li key={id}>{email}</li>
        ))}
      </ul>
    </div>
  );
}

// Component to create a new user
export function CreateUser() {
  /**
   * https://tanstack.com/query/latest/docs/framework/react/guides/mutations
   * https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
   */
  const ref = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  // Reset form on successful mutation
  const onSuccess = () => ref.current?.reset();
  // Invalidate users query to refetch updated list
  const onSettled = () => queryClient.invalidateQueries({ queryKey });

  // Mutation for creating a new user
  const mutation = useMutation({
    mutationFn,
    onSuccess,
    onSettled,
  });

  // Disable form during mutation
  const disabled = mutation.isPending;

  // Handle form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  }

  return (
    <>
      <h2>Create new user</h2>

      <form ref={ref} onSubmit={handleSubmit}>
        <input type="email" name="email" required disabled={disabled} />
        <button type="submit" disabled={disabled}>
          Submit
        </button>
      </form>

      {/* Show success message after user creation */}
      {mutation.isSuccess && <Link to="">User added!</Link>}
    </>
  );
}
