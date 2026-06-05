import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import { useState } from "react";

export function UtilityForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputBaseStyle: React.CSSProperties = {
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    width: "100%",
    padding: "0.625rem 0.75rem",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#111827",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: styleOptions.themeColor,
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    width: "100%",
    padding: "0.75rem 1.25rem",
    color: "#ffffff",
    border: "none",
    fontWeight: 600,
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  };

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="utility-form-title"
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: styleOptions.borderRadius,
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          fontSize: styleOptions.fontSize,
          color: "#111827",
        }}
      >
        <h2 id="utility-form-title" style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)`, fontWeight: 600, marginBottom: "1.5rem", textAlign: "center" }}>
          Форма (Utility-first / Tailwind)
        </h2>

        {isSuccess && <SuccessMessage />}

        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="tw-name" style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: styleOptions.fontSize, color: "#374151" }}>
            Имя <span aria-hidden="true">*</span>
          </label>
          <input
            id="tw-name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            style={{
              ...inputBaseStyle,
              borderColor: focusedField === "name" ? styleOptions.themeColor : errors.name ? "#ef4444" : "#d1d5db",
            }}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            {...register("name")}
          />
          {errors.name && <ErrorMessage id="tw-name-error">{errors.name.message}</ErrorMessage>}
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="tw-email" style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: styleOptions.fontSize, color: "#374151" }}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="tw-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            style={{
              ...inputBaseStyle,
              borderColor: focusedField === "email" ? styleOptions.themeColor : errors.email ? "#ef4444" : "#d1d5db",
            }}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="tw-email-error">{errors.email.message}</ErrorMessage>}
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="tw-password" style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: styleOptions.fontSize, color: "#374151" }}>
            Пароль <span aria-hidden="true">*</span>
          </label>
          <input
            id="tw-password"
            type="password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!errors.password}
            style={{
              ...inputBaseStyle,
              borderColor: focusedField === "password" ? styleOptions.themeColor : errors.password ? "#ef4444" : "#d1d5db",
            }}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            {...register("password")}
          />
          {errors.password && <ErrorMessage id="tw-password-error">{errors.password.message}</ErrorMessage>}
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

      <FormTheoryCard data={formTheory.utility} />
    </div>
  );
}