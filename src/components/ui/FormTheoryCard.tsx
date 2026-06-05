import { useState } from "react";
import type { FormTheoryData } from "../data/formTheory";

type FormTheoryCardProps = {
  data: FormTheoryData;
};

export function FormTheoryCard({ data }: FormTheoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      marginTop: "2rem",
      padding: "1.5rem",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      color: "#1e293b"
    }}>
      <div style={{ marginBottom: "1rem" }}>
        <span style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#4f46e5",
          background: "#e0e7ff",
          borderRadius: "9999px",
          marginBottom: "0.5rem"
        }}>
          Раздел {data.section}
        </span>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#0f172a",
          margin: 0
        }}>
          {data.title}
        </h3>
      </div>

      <p style={{
        fontSize: "0.95rem",
        lineHeight: 1.6,
        color: "#475569",
        whiteSpace: "pre-line",
        marginBottom: "1.5rem"
      }}>
        {data.description}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "0.9rem"
        }}
      >
        {isExpanded ? "Скрыть детали" : "Показать преимущества и недостатки"}
      </button>

      {isExpanded && (
        <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{
            padding: "1rem",
            background: "#dcfce7",
            borderRadius: "8px",
            border: "1px solid #86efac"
          }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#166534", marginBottom: "0.75rem" }}>
              ✓ Преимущества
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#14532d" }}>
              {data.advantages.map((adv, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{adv}</li>
              ))}
            </ul>
          </div>

          <div style={{
            padding: "1rem",
            background: "#fee2e2",
            borderRadius: "8px",
            border: "1px solid #fca5a5"
          }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#991b1b", marginBottom: "0.75rem" }}>
              ✗ Недостатки
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#7f1d1d" }}>
              {data.disadvantages.map((dis, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{dis}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}