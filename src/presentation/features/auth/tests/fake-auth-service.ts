import type {
  AuthCredentials,
  AuthResult,
  AuthService,
  AuthSession,
  AuthUser,
  PasswordRecoveryInput,
  RegisterInput,
} from "@/presentation/shared/types/auth";

export class FakeAuthService implements AuthService {
  public session: AuthSession = {
    user: null,
    expiresAt: null,
    isAuthenticated: false,
  };
  public signInCalls: AuthCredentials[] = [];
  public signUpCalls: RegisterInput[] = [];
  public signOutCalls = 0;
  public recoveryCalls: PasswordRecoveryInput[] = [];
  public listener?: (session: AuthSession) => void;

  async getSession(): Promise<AuthSession> {
    return this.session;
  }

  async signIn(credentials: AuthCredentials): Promise<AuthResult> {
    this.signInCalls.push(credentials);
    if (credentials.email === "fail@test.com") {
      return { success: false, error: "Credenciais inválidas" };
    }
    const user: AuthUser = {
      id: "user-1",
      email: credentials.email,
      displayName: "Teste",
      avatarUrl: null,
    };
    this.session = {
      user,
      expiresAt: Date.now() + 3600_000,
      isAuthenticated: true,
    };
    this.listener?.(this.session);
    return { success: true, user };
  }

  async signUp(input: RegisterInput): Promise<AuthResult> {
    this.signUpCalls.push(input);
    const user: AuthUser = {
      id: "user-1",
      email: input.email,
      displayName: input.displayName ?? null,
      avatarUrl: null,
    };
    this.session = {
      user,
      expiresAt: Date.now() + 3600_000,
      isAuthenticated: true,
    };
    this.listener?.(this.session);
    return { success: true, user };
  }

  async signOut(): Promise<void> {
    this.signOutCalls += 1;
    this.session = { user: null, expiresAt: null, isAuthenticated: false };
    this.listener?.(this.session);
  }

  async recoverPassword(input: PasswordRecoveryInput): Promise<AuthResult> {
    this.recoveryCalls.push(input);
    return {
      success: true,
      user: { id: "user-1", email: input.email, displayName: null, avatarUrl: null },
    };
  }

  onAuthStateChange(callback: (session: AuthSession) => void): () => void {
    this.listener = callback;
    return () => {
      this.listener = undefined;
    };
  }
}
