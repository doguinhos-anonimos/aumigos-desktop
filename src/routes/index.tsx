import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
