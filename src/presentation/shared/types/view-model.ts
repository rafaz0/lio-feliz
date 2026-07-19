export interface BaseViewModel<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: ErrorState | null;
  isEmpty: boolean;
}

export interface LoadingState {
  variant: "skeleton" | "spinner" | "placeholder";
  message?: string;
}

export interface ErrorState {
  code: string;
  type: string;
  message: string;
  timestamp: Date;
  retry?: () => void;
}

export interface EmptyState {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
