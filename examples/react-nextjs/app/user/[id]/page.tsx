import { getUser } from "./data";
import { OptimisticProvider } from "./optimistic";
import { UserProfile } from "./user-profile";

type Params = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: Params) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div>
      <p>User page</p>
      <OptimisticProvider user={user}>
        <UserProfile />
      </OptimisticProvider>
    </div>
  );
}
