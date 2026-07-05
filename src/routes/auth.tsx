import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Investidor Pro" },
      { name: "description", content: "Acesse sua conta para acompanhar sua carteira." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/carteira", replace: true });
  }, [user, loading, navigate]);

  return (
    <div className="grid min-h-screen bg-background text-foreground md:grid-cols-2">
      <div className="hidden flex-col justify-between border-r border-border bg-surface p-10 md:flex">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <LineChart className="size-5 text-primary" /> Investidor Pro
        </Link>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Plataforma</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Sua carteira e seus fundamentos, no mesmo cockpit.
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Registre suas operações, acompanhe a rentabilidade e mergulhe nos indicadores das ações
            que você segue.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Dados de mercado fictícios para demonstração.
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 font-semibold md:hidden"
          >
            <LineChart className="size-5 text-primary" /> Investidor Pro
          </Link>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function GoogleButton() {
  const [pending, setPending] = useState(false);
  async function onClick() {
    setPending(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Falha ao entrar com Google");
      setPending(false);
      return;
    }
    if (result.redirected) return;
  }
  return (
    <Button type="button" variant="outline" className="w-full gap-2" onClick={onClick} disabled={pending}>
      <GoogleIcon /> Continuar com Google
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.8 6.1 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.7 18.9 13 24 13c3.1 0 5.9 1.2 8 3l5.7-5.7C34.8 6.1 29.7 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.6 0 10.6-2.1 14.4-5.6l-6.6-5.6c-2 1.4-4.5 2.2-7.8 2.2-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.7 39.7 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.8 36.9 44 31 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [needsConfirm, setNeedsConfirm] = useState(false);
  const [resendPending, setResendPending] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setNeedsConfirm(false);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setNeedsConfirm(true);
        toast.error("Email nao confirmado. Clique em reenviar abaixo.");
      } else if (error.message.toLowerCase().includes("invalid login")) {
        toast.error("Email ou senha incorretos.");
      } else {
        toast.error(error.message);
      }
      return;
    }
    if (!data.session) {
      toast.error("Nao foi possivel iniciar sessao. Tente novamente.");
      return;
    }
    toast.success("Bem-vindo de volta");
    navigate({ to: "/carteira", replace: true });
  }

  async function resendConfirmation() {
    if (!email) {
      toast.error("Informe seu email acima primeiro.");
      return;
    }
    setResendPending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setResendPending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Email de confirmacao reenviado! Verifique caixa de entrada e spam.", {
      duration: 8000,
    });
  }

  return (
    <div className="space-y-4">
      <GoogleButton />
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">ou</span>
        <Separator className="flex-1" />
      </div>
      <form onSubmit={submit} className="grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={pending} className="mt-2">
          {pending ? "Entrando…" : "Entrar"}
        </Button>
        {needsConfirm && (
          <Button
            type="button"
            variant="outline"
            disabled={resendPending}
            onClick={resendConfirmation}
          >
            {resendPending ? "Reenviando…" : "Reenviar email de confirmação"}
          </Button>
        )}
      </form>
    </div>
  );
}

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: name },
      },
    });
    setPending(false);
    if (error) return toast.error(error.message);
    if (data.session) {
      toast.success("Conta criada!");
      navigate({ to: "/carteira", replace: true });
      return;
    }
    toast.success(
      "Conta criada! Verifique seu email (caixa de entrada e spam) para confirmar antes de entrar.",
      { duration: 8000 },
    );
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="space-y-4">
      <GoogleButton />
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">ou</span>
        <Separator className="flex-1" />
      </div>
      <form onSubmit={submit} className="grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email2">Email</Label>
          <Input id="email2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password2">Senha</Label>
          <Input
            id="password2"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={pending} className="mt-2">
          {pending ? "Criando…" : "Criar conta"}
        </Button>
      </form>
    </div>
  );
}
