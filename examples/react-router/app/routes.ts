import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  layout("./routes/users/layout.tsx", [
    ...prefix("users", [
      index("./routes/users/users.tsx"),
      route(":user", "./routes/users/user.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
