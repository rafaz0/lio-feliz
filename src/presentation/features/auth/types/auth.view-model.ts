import type { AuthUser, AuthSession } from "@/presentation/shared/types/auth";

export interface LoginViewModel {
  email: string;
  password: string;
  isSubmitting: boolean;
  error: string | null;
}

export interface UserViewModel {
  id: string;
  email: string;
  displayName: string;
  initials: string;
  avatarUrl: string | null;
}

export interface SessionViewModel {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserViewModel | null;
  expiresAt: number | null;
}

export function toUserViewModel(user: AuthUser | null): UserViewModel | null {
  if (!user) return null;
  const displayName = user.displayName ?? user.email ?? "Usuário";
  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return {
    id: user.id,
    email: user.email ?? "",
    displayName,
    initials: initials || "?",
    avatarUrl: user.avatarUrl,
  };
}

export function toSessionViewModel(session: AuthSession, isLoading: boolean): SessionViewModel {
  return {
    isAuthenticated: session.isAuthenticated,
    isLoading,
    user: toUserViewModel(session.user),
    expiresAt: session.expiresAt,
  };
}
