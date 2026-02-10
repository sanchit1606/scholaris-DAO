import React from "react";

interface DevProfileCardProps {
  name?: string;
  role?: string;
}

// Simple placeholder so Technical.tsx can import this component without errors.
export default function DevProfileCard({ name, role }: DevProfileCardProps) {
  return (
    <div className="glass-card p-4 text-sm">
      <p className="font-semibold">{name ?? "Developer"}</p>
      {role && <p className="text-muted-foreground">{role}</p>}
    </div>
  );
}


