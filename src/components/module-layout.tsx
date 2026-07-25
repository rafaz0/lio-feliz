import type { ReactNode } from "react";
import { ModuleBreadcrumb, type BreadcrumbItem } from "./module-breadcrumb";
import { ModuleHeader } from "./module-header";
import { ModuleTabs, type ModuleTab } from "./module-tabs";
import { cn } from "@/lib/utils";

interface ModuleLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  tabs?: ModuleTab[];
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ModuleLayout({
  title,
  description,
  breadcrumbs,
  tabs,
  action,
  children,
  className,
}: ModuleLayoutProps) {
  return (
    <main className={cn("space-y-6", className)}>
      <ModuleBreadcrumb items={breadcrumbs} />
      <ModuleHeader title={title} description={description} action={action} />
      {tabs && tabs.length > 0 && <ModuleTabs tabs={tabs} />}
      <div>{children}</div>
    </main>
  );
}
