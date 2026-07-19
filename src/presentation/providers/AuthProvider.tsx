import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
  AuthCredentials,
  AuthResult,
  AuthService,
  AuthSession,
  PasswordRecoveryInput,
  RegisterInput,
} from "@/presentation/shared/types/auth";

interface AuthContextValue {
  session: AuthSession;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthSession["user"];
  login: (credentials: AuthCredentials) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  logout: () => Promise<void>;
  recoverPassword: (input: PasswordRecoveryInput) => Promise<AuthResult>;
  refresh: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export interface AuthProviderProps {
  authService: AuthService;
  children: ReactNode;
}

const UNAUTHENTICATED: AuthSession = {
  user: null,
  expiresAt: null,
  isAuthenticated: false,
};

export function AuthProvider({ authService, children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession>(UNAUTHENTICATED);
  const [isLoading, setIsLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const current = await authService.getSession();
      setSession(current);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  useEffect(() => {
    void restoreSession();
    const unsubscribe = authService.onAuthStateChange((next) => {
      setSession(next);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [authService, restoreSession]);

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      const result = await authService.signIn(credentials);
      if (result.success) {
        const current = await authService.getSession();
        setSession(current);
      }
      return result;
    },
    [authService],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      const result = await authService.signUp(input);
      if (result.success) {
        const current = await authService.getSession();
        setSession(current);
      }
      return result;
    },
    [authService],
  );

  const logout = useCallback(async () => {
    await authService.signOut();
    setSession(UNAUTHENTICATED);
  }, [authService]);

  const recoverPassword = useCallback(
    (input: PasswordRecoveryInput) => authService.recoverPassword(input),
    [authService],
  );

  const refresh = useCallback(async () => {
    const current = await authService.getSession();
    setSession(current);
  }, [authService]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      isAuthenticated: session.isAuthenticated,
      user: session.user,
      login,
      register,
      logout,
      recoverPassword,
      refresh,
      restoreSession,
    }),
    [session, isLoading, login, register, logout, recoverPassword, refresh, restoreSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
