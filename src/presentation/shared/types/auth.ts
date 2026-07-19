export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

export interface AuthSession {
  user: AuthUser | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  displayName?: string;
}

export interface PasswordRecoveryInput {
  email: string;
}

export type AuthResult = { success: true; user: AuthUser } | { success: false; error: string };

export interface AuthService {
  getSession(): Promise<AuthSession>;
  signIn(credentials: AuthCredentials): Promise<AuthResult>;
  signUp(input: RegisterInput): Promise<AuthResult>;
  signOut(): Promise<void>;
  recoverPassword(input: PasswordRecoveryInput): Promise<AuthResult>;
  onAuthStateChange(callback: (session: AuthSession) => void): () => void;
}
