import { Link, Redirect, Route, Switch } from "wouter";
import Home from "./routes/home";
import { UserList, CreateUser } from "./routes/users";

function UserRoutes() {
  return (
    <>
      <UserList />

      <Link href="/new">Create new user</Link>

      <Switch>
        <Route path="/new" component={CreateUser} />
        <Route>
          <Redirect to="" />
        </Route>
      </Switch>
    </>
  );
}

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/users" component={UserRoutes} nest />
      <Route>404, Not Found!</Route>
    </Switch>
  );
}
