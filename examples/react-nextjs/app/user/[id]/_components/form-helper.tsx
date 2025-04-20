const formGuideData = [
  {
    title: "Validation check before request",
    items: [
      "Last name: Minimum 3 characters.",
      "Email: Must be in a valid email format.",
    ],
  },
  {
    title: "API Server-side error",
    items: [
      "If all fields pass validation, but the First name is empty, you return a server error.",
    ],
  },
  {
    title: "Success",
    items: [
      "If all fields are filled correctly and pass both validation and server-side checks.",
    ],
  },
];

export function FormHelper() {
  const ListItem = ({ title, items }: { title: string; items: string[] }) => (
    <li>
      {title}
      {items.length && (
        <ol>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}
    </li>
  );

  return (
    <ul>
      {formGuideData.map((section) => (
        <ListItem
          key={section.title}
          title={section.title}
          items={section.items}
        />
      ))}
    </ul>
  );
}
