import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/use-auth";
import { cn } from "@/presentation/shared/utils";

interface RegisterFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function RegisterForm({ onSuccess, className }: RegisterFormProps) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await register({ email, password, displayName });
    setIsSubmitting(false);
    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error);
    }
  }

  return (
    <form className={cn("flex flex-col gap-4", className)} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-name" className="text-sm font-medium text-foreground">
          Nome de exibição
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Seu nome"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-email" className="text-sm font-medium text-foreground">
          E-mail
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="voce@exemplo.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-password" className="text-sm font-medium text-foreground">
          Senha
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="••••••••"
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
        {isSubmitting ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
}
