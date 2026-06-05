import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import "../../../styles/baseline-form.css";
import { useState } from "react";

export function BaselineForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });

  // Стили для инпутов
  const inputStyle: React.CSSProperties = {
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
    borderColor: "#d1d5db",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: styleOptions.themeColor,
    boxShadow: `0 0 0 3px ${styleOptions.themeColor}26`, // 26 = 15% прозрачности
  };

  // Стили для кнопки
  const buttonStyle: React.CSSProperties = {
    backgroundColor: styleOptions.themeColor,
    borderRadius: styleOptions.borderRadius,
    fontSize: styleOptions.fontSize,
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />
      
      <form
        className="baseline-form"
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="baseline-form-title"
        style={{
          borderRadius: styleOptions.borderRadius,
          fontSize: styleOptions.fontSize,
        }}
      >
        <h2 id="baseline-form-title" style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)` }}>
          Форма (Baseline CSS)
        </h2>

        {isSuccess && <SuccessMessage />}

        <div className="baseline-form__field">
          <label className="baseline-form__label" htmlFor="baseline-name" style={{ fontSize: styleOptions.fontSize }}>
            Имя <span aria-hidden="true">*</span>
          </label>
          <input
            id="baseline-name"
            className="baseline-form__input"
            type="text"
            autoComplete="name"
            placeholder="Введите ваше имя"
            aria-required="true"
            aria-invalid={!!errors.name}
            style={{
              ...inputStyle,
              ...(focusedField === "name" ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            {...register("name")}
          />
          {errors.name && <ErrorMessage id="baseline-name-error">{errors.name.message}</ErrorMessage>}
        </div>

        <div className="baseline-form__field">
          <label className="baseline-form__label" htmlFor="baseline-email" style={{ fontSize: styleOptions.fontSize }}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="baseline-email"
            className="baseline-form__input"
            type="email"
            autoComplete="email"
            placeholder="example@mail.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            style={{
              ...inputStyle,
              ...(focusedField === "email" ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="baseline-email-error">{errors.email.message}</ErrorMessage>}
        </div>

        <div className="baseline-form__field">
          <label className="baseline-form__label" htmlFor="baseline-password" style={{ fontSize: styleOptions.fontSize }}>
            Пароль <span aria-hidden="true">*</span>
          </label>
          <input
            id="baseline-password"
            className="baseline-form__input"
            type="password"
            autoComplete="new-password"
            placeholder="Минимум 6 символов"
            aria-required="true"
            aria-invalid={!!errors.password}
            style={{
              ...inputStyle,
              ...(focusedField === "password" ? inputFocusStyle : {}),
            }}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            {...register("password")}
          />
          {errors.password && <ErrorMessage id="baseline-password-error">{errors.password.message}</ErrorMessage>}
        </div>

        <div className="baseline-form__field">
          <label className="baseline-form__checkbox-label" style={{ fontSize: styleOptions.fontSize }}>
            <input 
              type="checkbox" 
              className="baseline-form__checkbox" 
              style={{ accentColor: styleOptions.themeColor }}
              {...register("newsletter")} 
            />
            <span>Получать новости по email</span>
          </label>
        </div>

        <button
          type="submit"
          className="baseline-form__submit"
          disabled={isSubmitting}
          style={buttonStyle}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </form>

      <FormTheoryCard data={formTheory.baseline} />
    </div>
  );
}