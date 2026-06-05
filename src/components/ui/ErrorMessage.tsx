import { ReactNode } from "react";

type ErrorMessageProps = {
  id?: string;
  children: ReactNode;
};

export function ErrorMessage({ id, children }: ErrorMessageProps) {
  if (!children) return null;
  
  return (
    <p 
      id={id}
      role="alert"
      aria-live="polite"
      style={{
        marginTop: "0.5rem",
        fontSize: "0.75rem",
        color: "#ef4444",
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        fontWeight: 500
      }}
    >
      <span aria-hidden="true">⚠</span>
      {children}
    </p>
  );
}