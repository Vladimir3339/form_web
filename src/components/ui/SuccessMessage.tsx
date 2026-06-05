type SuccessMessageProps = {
  message?: string;
};

export function SuccessMessage({ message = "✓ Форма успешно отправлена!" }: SuccessMessageProps) {
  return (
    <div className="success-message" role="status" aria-live="polite">
      {message}
    </div>
  );
}