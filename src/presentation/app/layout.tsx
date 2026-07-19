import type { ReactNode } from "react";
import { AppLayout } from "@/presentation/shared/components/layout/AppLayout";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
