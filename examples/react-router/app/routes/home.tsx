import { Link } from "react-router";

export function meta() {
  return [
    { title: "React Router App" },
    { name: "descriiiption", content: "Welcome to React Router" },
  ];
}

export default function Home() {
  return <Link to="/users">Hello, World!</Link>;
}
