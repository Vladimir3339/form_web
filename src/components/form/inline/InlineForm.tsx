import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import { useState } from "react";

export function InlineForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formStyle: React.CSSProperties = {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "2rem",
    borderRadius: styleOptions.borderRadius,
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    fontSize: styleOptions.fontSize,
    color: "#111827",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 500,
    marginBottom: "0.5rem",
    fontSize: styleOptions.fontSize,
    color: "#374151",
  };

  const getInputStyle = (fieldName: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.625rem 0.75rem",
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    border: `1px solid ${focusedField === fieldName ? styleOptions.themeColor : errors[fieldName as keyof typeof errors] ? "#ef4444" : "#d1d5db"}`,
    backgroundColor: "#ffffff",
    color: "#111827",
    boxSizing: "border-box",
  });

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    marginTop: "0.5rem",
    padding: "0.75rem 1.25rem",
    borderRadius: styleOptions.borderRadius,
    border: "none",
    backgroundColor: styleOptions.themeColor,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: styleOptions.fontSize,
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  };

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />

      <form
        style={formStyle}
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="inline-form-title"
      >
        <h2 id="inline-form-title" style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)`, fontWeight: 600, marginBottom: "1.5rem", textAlign: "center" }}>
          Форма (Inline-стили)
        </h2>

        {isSuccess && <SuccessMessage />}

        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="inline-name" style={labelStyle}>
            Имя <span aria-hidden="true">*</span>
          </label>
          <input
            id="inline-name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            style={getInputStyle("name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            {...register("name")}
          />
          {errors.name && <ErrorMessage id="inline-name-error">{errors.name.message}</ErrorMessage>}
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="inline-email" style={labelStyle}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="inline-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            style={getInputStyle("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="inline-email-error">{errors.email.message}</ErrorMessage>}
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="inline-password" style={labelStyle}>
            Пароль <span aria-hidden="true">*</span>
          </label>
          <input
            id="inline-password"
            type="password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!errors.password}
            style={getInputStyle("password")}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            {...register("password")}
          />
          {errors.password && <ErrorMessage id="inline-password-error">{errors.password.message}</ErrorMessage>}
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: styleOptions.fontSize, color: "#374151", cursor: "pointer" }}>
            <input
              type="checkbox"
              style={{ accentColor: styleOptions.themeColor, width: "1rem", height: "1rem" }}
              {...register("newsletter")}
            />
            <span>Получать новости по email</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={buttonStyle}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </form>

      <FormTheoryCard data={formTheory.inline} />
    </div>
  );
}