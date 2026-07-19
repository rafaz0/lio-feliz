import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type {
  AuthCredentials,
  AuthResult,
  AuthService,
  AuthSession,
  AuthUser,
  PasswordRecoveryInput,
  RegisterInput,
} from "@/presentation/shared/types/auth";

function mapSession(session: Session | null): AuthSession {
  if (!session?.user) {
    return { user: null, expiresAt: null, isAuthenticated: false };
  }
  const user: AuthUser = {
    id: session.user.id,
    email: session.user.email ?? null,
    displayName: (session.user.user_metadata?.display_name as string | undefined) ?? null,
    avatarUrl: (session.user.user_metadata?.avatar_url as string | undefined) ?? null,
  };
  return {
    user,
    expiresAt: session.expires_at ? session.expires_at * 1000 : null,
    isAuthenticated: true,
  };
}

export class SupabaseAuthService implements AuthService {
  async getSession(): Promise<AuthSession> {
    const { data } = await supabase.auth.getSession();
    return mapSession(data.session);
  }

  async signIn(credentials: AuthCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error || !data.user) {
      return { success: false, error: error?.message ?? "Falha na autenticação" };
    }
    return { success: true, user: mapSession(data.session)?.user ?? ({} as AuthUser) };
  }

  async signUp(input: RegisterInput): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: input.displayName ? { data: { display_name: input.displayName } } : undefined,
    });
    if (error || !data.user) {
      return { success: false, error: error?.message ?? "Falha no cadastro" };
    }
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email ?? null,
        displayName: input.displayName ?? null,
        avatarUrl: null,
      },
    };
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  async recoverPassword(input: PasswordRecoveryInput): Promise<AuthResult> {
    const { error } = await supabase.auth.resetPasswordForEmail(input.email);
    if (error) {
      return { success: false, error: error.message };
    }
    return {
      success: true,
      user: { id: "pending", email: input.email, displayName: null, avatarUrl: null },
    };
  }

  onAuthStateChange(callback: (session: AuthSession) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(mapSession(session));
    });
    return () => data.subscription.unsubscribe();
  }
}
