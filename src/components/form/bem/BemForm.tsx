import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import "../../../styles/bem-form.css";
import { useState } from "react";

export function BemForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Функция для получения стилей инпута (явно задаем цвет границы, чтобы перебить CSS :focus)
  const getInputStyle = (fieldName: string): React.CSSProperties => ({
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    borderColor: focusedField === fieldName
      ? styleOptions.themeColor
      : errors[fieldName as keyof typeof errors]
      ? "#ef4444"
      : "#d1d5db",
  });

  // Стили для кнопки (используем 'background' и убираем градиент из CSS)
  const buttonStyle: React.CSSProperties = {
    background: styleOptions.themeColor,
    backgroundImage: 'none', // КРИТИЧНО: убирает градиент из bem-form.css
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    width: "100%",
    padding: "0.75rem 1.25rem",
    color: "#ffffff",
    border: "none",
    fontWeight: 600,
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
    transition: "opacity 0.2s",
  };

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />

      <form
        className="form"
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="bem-form-title"
        style={{ borderRadius: styleOptions.borderRadius, fontSize: styleOptions.fontSize }}
      >
        <h2 id="bem-form-title" className="form__title" style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)` }}>
          Форма (BEM методология)
        </h2>

        {isSuccess && <SuccessMessage />}

        <div className="form__group">
          <label className="form__label" htmlFor="bem-name" style={{ fontSize: styleOptions.fontSize }}>
            Имя <span aria-hidden="true">*</span>
          </label>
          <input
            id="bem-name"
            className={`form__control${errors.name ? " form__control--error" : ""}`}
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            style={getInputStyle("name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            {...register("name")}
          />
          {errors.name && <ErrorMessage id="bem-name-error">{errors.name.message}</ErrorMessage>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="bem-email" style={{ fontSize: styleOptions.fontSize }}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="bem-email"
            className={`form__control${errors.email ? " form__control--error" : ""}`}
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            style={getInputStyle("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="bem-email-error">{errors.email.message}</ErrorMessage>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="bem-password" style={{ fontSize: styleOptions.fontSize }}>
            Пароль <span aria-hidden="true">*</span>
          </label>
          <input
            id="bem-password"
            className={`form__control${errors.password ? " form__control--error" : ""}`}
            type="password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!errors.password}
            style={getInputStyle("password")}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            {...register("password")}
          />
          {errors.password && <ErrorMessage id="bem-password-error">{errors.password.message}</ErrorMessage>}
        </div>

        <div className="form__group form__group--checkbox">
          <label className="form__checkbox-label" style={{ fontSize: styleOptions.fontSize }}>
            <input
              type="checkbox"
              className="form__checkbox"
              style={{ accentColor: styleOptions.themeColor }}
              {...register("newsletter")}
            />
            <span>Получать новости по email</span>
          </label>
        </div>

        <div className="form__footer">
          <button
            type="submit"
            className="form__submit"
            disabled={isSubmitting}
            style={buttonStyle}
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </form>

      <FormTheoryCard data={formTheory.bem} />
    </div>
  );
}