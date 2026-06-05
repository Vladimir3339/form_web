import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "../validation";

export function useContactForm(onSubmit?: (data: ContactFormData) => void) {
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Явно указываем дженерик <ContactFormData>, чтобы типы совпадали идеально
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      newsletter: false,
    },
    mode: "onBlur",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSuccess(false);
    try {
      // Имитация отправки на сервер (1.5 секунды)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted successfully:", data);
      onSubmit?.(data);
      
      setIsSuccess(true);
      form.reset(); // Сбрасываем форму после успешной отправки
      
      // Скрываем сообщение об успехе через 5 секунд
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submit error:", error);
    }
  });

  return { ...form, handleSubmit, isSuccess };
}