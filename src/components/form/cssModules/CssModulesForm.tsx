import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import styles from "./CssModulesForm.module.css";
import { useState } from "react";

export function CssModulesForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle: React.CSSProperties = {
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: styleOptions.themeColor,
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
  };

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />

      <form
        className={styles.wrapper}
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="cm-form-title"
        style={{ borderRadius: styleOptions.borderRadius, fontSize: styleOptions.fontSize }}
      >
        <h2 id="cm-form-title" className={styles.title} style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)` }}>
          Форма (CSS Modules)
        </h2>

        {isSuccess && <SuccessMessage />}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cm-name" style={{ fontSize: styleOptions.fontSize }}>
            Имя <span aria-hidden="true">*</span>
          </label>
          <input
            id="cm-name"
            className={`${styles.input}${errors.name ? " " + styles.inputError : ""}`}
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
          {errors.name && <ErrorMessage id="cm-name-error">{errors.name.message}</ErrorMessage>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cm-email" style={{ fontSize: styleOptions.fontSize }}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="cm-email"
            className={`${styles.input}${errors.email ? " " + styles.inputError : ""}`}
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
          {errors.email && <ErrorMessage id="cm-email-error">{errors.email.message}</ErrorMessage>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cm-password" style={{ fontSize: styleOptions.fontSize }}>
            Пароль <span aria-hidden="true">*</span>
          </label>
          <input
            id="cm-password"
            className={`${styles.input}${errors.password ? " " + styles.inputError : ""}`}
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
          {errors.password && <ErrorMessage id="cm-password-error">{errors.password.message}</ErrorMessage>}
        </div>

        <div className={styles.field}>
          <label className={styles.checkboxLabel} style={{ fontSize: styleOptions.fontSize }}>
            <input
              type="checkbox"
              className={styles.checkbox}
              style={{ accentColor: styleOptions.themeColor }}
              {...register("newsletter")}
            />
            <span>Получать новости по email</span>
          </label>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={isSubmitting}
          style={buttonStyle}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </form>

      <FormTheoryCard data={formTheory["css-modules"]} />
    </div>
  );
}