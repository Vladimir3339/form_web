import styled from "styled-components";
import { useContactForm } from "../hooks/useContactForm";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { SuccessMessage } from "../../ui/SuccessMessage";
import { FormTheoryCard } from "../../ui/FormTheoryCard";
import { StyleControls, type StyleOptions } from "../../ui/StyleControls";
import { formTheory } from "../../data/formTheory";
import { useState } from "react";

// Базовые styled-компоненты
const FormWrapper = styled.form`
  max-width: 420px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  color: #111827;
`;

const FormTitle = styled.h2`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Field = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const Input = styled.input<{ $borderColor?: string; $radius?: string; $fontSize?: string }>`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${(props) => props.$borderColor || "#d1d5db"};
  border-radius: ${(props) => props.$radius || "8px"};
  font-size: ${(props) => props.$fontSize || "16px"};
  background-color: #ffffff;
  color: #111827;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.$borderColor || "#2563eb"};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const SubmitButton = styled.button<{ $bgColor?: string; $radius?: string; $fontSize?: string }>`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: ${(props) => props.$radius || "8px"};
  background-color: ${(props) => props.$bgColor || "#2563eb"};
  color: #ffffff;
  font-weight: 600;
  font-size: ${(props) => props.$fontSize || "16px"};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export function CssInJsForm() {
  const { register, handleSubmit, formState, isSuccess } = useContactForm();
  const { errors, isSubmitting } = formState;
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    themeColor: "#2563eb",
    borderRadius: "8px",
    fontSize: "16px"
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getBorderColor = (fieldName: string) => {
    if (focusedField === fieldName) return styleOptions.themeColor;
    if (errors[fieldName as keyof typeof errors]) return "#ef4444";
    return "#d1d5db";
  };

  return (
    <div>
      <StyleControls onStyleChange={setStyleOptions} />

      <FormWrapper
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="sc-form-title"
        style={{ borderRadius: styleOptions.borderRadius, fontSize: styleOptions.fontSize }}
      >
        <FormTitle id="sc-form-title" style={{ fontSize: `calc(${styleOptions.fontSize} * 1.25)` }}>
          Форма (CSS-in-JS, styled-components)
        </FormTitle>

        {isSuccess && <SuccessMessage />}

        <Field>
          <Label htmlFor="sc-name" style={{ fontSize: styleOptions.fontSize }}>
            Имя <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="sc-name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            $borderColor={getBorderColor("name")}
            $radius={styleOptions.borderRadius}
            $fontSize={styleOptions.fontSize}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            {...register("name")}
          />
          {errors.name && <ErrorMessage id="sc-name-error">{errors.name.message}</ErrorMessage>}
        </Field>

        <Field>
          <Label htmlFor="sc-email" style={{ fontSize: styleOptions.fontSize }}>
            Email <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="sc-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            $borderColor={getBorderColor("email")}
            $radius={styleOptions.borderRadius}
            $fontSize={styleOptions.fontSize}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="sc-email-error">{errors.email.message}</ErrorMessage>}
        </Field>

        <Field>
          <Label htmlFor="sc-password" style={{ fontSize: styleOptions.fontSize }}>
            Пароль <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="sc-password"
            type="password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={!!errors.password}
            $borderColor={getBorderColor("password")}
            $radius={styleOptions.borderRadius}
            $fontSize={styleOptions.fontSize}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            {...register("password")}
          />
          {errors.password && <ErrorMessage id="sc-password-error">{errors.password.message}</ErrorMessage>}
        </Field>

        <Field>
          <CheckboxLabel style={{ fontSize: styleOptions.fontSize }}>
            <Checkbox
              type="checkbox"
              style={{ accentColor: styleOptions.themeColor }}
              {...register("newsletter")}
            />
            <span>Получать новости по email</span>
          </CheckboxLabel>
        </Field>

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          $bgColor={styleOptions.themeColor}
          $radius={styleOptions.borderRadius}
          $fontSize={styleOptions.fontSize}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </SubmitButton>
      </FormWrapper>

      <FormTheoryCard data={formTheory["css-in-js"]} />
    </div>
  );
}