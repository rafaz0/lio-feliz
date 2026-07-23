"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface State {
  hasError: boolean;
  message: string;
}

interface Props {
  children: ReactNode;
  /** Texto opcional explicando qual parte falhou (para debug). */
  label?: string;
}

/**
 * Boundary defensiva — isola runtime errors dentro de uma seção sem
 * derrubar a árvore inteira. Substitui o conteúdo por uma mensagem
 * discreta em vez de jogar uma tela em branco.
 */
export class SafeBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const label = this.props.label ?? "?";
    // Diagnóstico local: aparece no console do navegador, útil em preview.

    console.error(`[SafeBoundary:${label}]`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mb-2 rounded border border-negative/30 bg-negative/5 px-3 py-2 text-xs text-negative">
          Falha ao renderizar seção <strong>{this.props.label ?? "?"}</strong>:{" "}
          <span className="font-mono">{this.state.message}</span>
        </div>
      );
    }
    return this.props.children;
  }
}
