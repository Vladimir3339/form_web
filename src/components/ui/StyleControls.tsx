import { useState } from "react";

export interface StyleOptions {
  themeColor: string;
  borderRadius: string;
  fontSize: string;
}

type StyleControlsProps = {
  onStyleChange: (options: StyleOptions) => void;
};

export function StyleControls({ onStyleChange }: StyleControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });

  const handleChange = (key: keyof StyleOptions, value: string) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onStyleChange(newOptions);
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "0.75rem 1.5rem",
          background: "#1e293b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        <span></span>
        {isOpen ? "Скрыть настройки стилей" : "Настройки стилей"}
      </button>

      {isOpen && (
        <div style={{
          marginTop: "1rem",
          padding: "1.5rem",
          background: "white",
          borderRadius: "12px",
          border: "2px solid #e2e8f0",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            
            {/* Цвет темы */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>
                Цвет темы
              </label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="color"
                  value={options.themeColor}
                  onChange={(e) => handleChange("themeColor", e.target.value)}
                  style={{ width: "50px", height: "40px", cursor: "pointer", border: "none", borderRadius: "6px" }}
                />
                <span style={{ fontSize: "0.85rem", color: "#6b7280", fontFamily: "monospace" }}>
                  {options.themeColor}
                </span>
              </div>
            </div>

            {/* Скругление углов */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>
                Скругление углов
              </label>
              <select
                value={options.borderRadius}
                onChange={(e) => handleChange("borderRadius", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  background: "white"
                }}
              >
                <option value="0px">Без скругления</option>
                <option value="4px">Минимальное (4px)</option>
                <option value="8px">Среднее (8px)</option>
                <option value="12px">Большое (12px)</option>
                <option value="16px">Очень большое (16px)</option>
              </select>
            </div>

            {/* Размер шрифта */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>
                Размер шрифта
              </label>
              <select
                value={options.fontSize}
                onChange={(e) => handleChange("fontSize", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  background: "white"
                }}
              >
                <option value="14px">Маленький (14px)</option>
                <option value="16px">Нормальный (16px)</option>
                <option value="18px">Большой (18px)</option>
                <option value="20px">Очень большой (20px)</option>
              </select>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}