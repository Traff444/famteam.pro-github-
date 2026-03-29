import { useState } from "react";

interface FormData {
  name: string;
  contact: string;
  task: string;
}

export function useContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", contact: "", task: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const FORM_ENDPOINT = "https://famteam-form.teammfamm.workers.dev";
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Ошибка отправки");
      }

      setSent(true);
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setSending(false);
    }
  };

  return { form, setForm, sent, sending, error, handleSubmit };
}
