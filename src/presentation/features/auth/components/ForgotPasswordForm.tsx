import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/use-auth";
import { cn } from "@/presentation/shared/utils";

interface ForgotPasswordFormProps {
  onSent?: () => void;
  className?: string;
}

export function ForgotPasswordForm({ onSent, className }: ForgotPasswordFormProps) {
  const { recoverPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await recoverPassword({ email });
    setIsSubmitting(false);
    if (result.success) {
      setSent(true);
      onSent?.();
    } else {
      setError(result.error);
    }
  }

  if (sent) {
    return (
      <p role="status" className="text-sm text-positive">
        Enviamos um link de recuperação para {email}.
      </p>
    );
  }

  return (
    <form className={cn("flex flex-col gap-4", className)} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="forgot-email" className="text-sm font-medium text-foreground">
          E-mail
        </label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="voce@exemplo.com"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
      </button>
    </form>
  );
}
