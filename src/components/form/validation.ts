import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Имя обязательно")
    .max(100, "Слишком длинное имя"),
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  password: z
    .string()
    .min(6, "Пароль должен содержать не менее 6 символов"),
  // ИСПРАВЛЕНО: убрали .optional(), оставили только .default(false)
  // Теперь TypeScript знает, что это строго boolean, а не boolean | undefined
  newsletter: z.boolean().default(false),
});

// Экспортируем тип, чтобы использовать его в хуке
export type ContactFormData = z.infer<typeof contactFormSchema>;