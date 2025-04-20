"use client";

interface Props {
  reset: () => void;
}
export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
      <body>
        <h2>Error</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
