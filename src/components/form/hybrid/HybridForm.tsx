import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import styles from "./HybridForm.module.css";
import "./HybridForm.css";
import { useState } from "react";

export function HybridForm() {
  const { register, handleSubmit, formState, isSuccess, watch } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const passwordValue = watch("password");
  const passwordStrength = passwordValue?.length || 0;
  const strengthColor = passwordStrength < 6 ? "#ef4444" : passwordStrength < 10 ? "#f59e0b" : "#10b981";
  const strengthWidth = `${Math.min((passwordStrength / 12) * 100, 100)}%`;

  const inputStyle: React.CSSProperties = {
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    width: "100%",
    padding: "0.625rem 0.75rem",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#111827",
    boxSizing: "border-box",
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
        className={`${styles.hybridForm} utility-container`}
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="hybrid-form-title"
        style={{ borderRadius: styleOptions.borderRadius, fontSize: styleOptions.fontSize }}
      >
        <h2 id="hybrid-form-title" style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)`, fontWeight: 600, marginBottom: "1rem", textAlign: "center" }}>
          Форма (гибридный подход)
        </h2>

        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem", textAlign: "center", fontStyle: "italic" }}>
          Комбинация: CSS Modules + Utility-классы + Inline-стили
        </p>

        {isSuccess && <SuccessMessage />}

        {/* Поле "Имя" - CSS Modules */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="hybrid-name" style={{ fontSize: styleOptions.fontSize }}>
            Имя <span aria-hidden="true">*</span>
          </label>
          <input
            id="hybrid-name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            style={{
              ...inputStyle,
              borderColor: focusedField === "name" ? styleOptions.themeColor : undefined,
            }}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            {...register("name")}
          />
          {errors.name && <ErrorMessage id="hybrid-name-error">{errors.name.message}</ErrorMessage>}
        </div>

        {/* Поле "Email" - Utility-классы (inline стили как замена Tailwind) */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="hybrid-email" style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: styleOptions.fontSize, color: "#374151" }}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="hybrid-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            style={{
              ...inputStyle,
              borderColor: focusedField === "email" ? styleOptions.themeColor : undefined,
            }}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="hybrid-email-error">{errors.email.message}</ErrorMessage>}
        </div>

        {/* Поле "Пароль" - CSS Modules + Inline-стили для индикатора */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="hybrid-password" style={{ fontSize: styleOptions.fontSize }}>
            Пароль <span aria-hidden="true">*</span>
          </label>
          <input
            id="hybrid-password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            type="password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!errors.password}
            style={{
              ...inputStyle,
              borderColor: focusedField === "password" ? styleOptions.themeColor : undefined,
            }}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            {...register("password")}
          />

          {/* Индикатор силы пароля - inline-стили */}
          <div style={{ marginTop: "0.5rem" }}>
            <div style={{ height: "8px", backgroundColor: "#e5e7eb", borderRadius: "9999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: strengthWidth,
                  backgroundColor: strengthColor,
                  transition: "all 0.3s ease",
                  borderRadius: "9999px",
                }}
              />
            </div>
            <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
              Сила пароля: {passwordStrength < 6 ? "Слабый" : passwordStrength < 10 ? "Средний" : "Надёжный"}
            </p>
          </div>

          {errors.password && <ErrorMessage id="hybrid-password-error">{errors.password.message}</ErrorMessage>}
        </div>

        {/* Чекбокс - Global CSS */}
        <div className="form-checkbox-group" style={{ margin: "1.5rem 0", padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: styleOptions.fontSize, color: "#374151", cursor: "pointer" }}>
            <input
              type="checkbox"
              style={{ accentColor: styleOptions.themeColor, width: "1rem", height: "1rem" }}
              {...register("newsletter")}
            />
            <span>Получать новости по email</span>
          </label>
        </div>

        {/* Кнопка - CSS Modules с inline-стилями */}
        <button
          type="submit"
          className={styles.submit}
          disabled={isSubmitting}
          style={buttonStyle}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>

        {/* Дополнительная информация - Global CSS */}
        <div className="form-info-box" style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#f0f9ff", borderLeft: `4px solid ${styleOptions.themeColor}`, borderRadius: "4px" }}>
          <p style={{ fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.5 }}>
            Эта форма демонстрирует гибридный подход: CSS Modules для изоляции, inline-стили для динамических значений, и глобальные классы для layout.
          </p>
        </div>
      </form>

      <FormTheoryCard data={formTheory.hybrid} />
    </div>
  );
}