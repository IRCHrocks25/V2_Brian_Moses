import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ThemeProvider } from "@/components/dashboard/ThemeContext";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login?redirect=/dashboard");
  }

  return (
    <ThemeProvider>
      <DashboardShell session={session}>{children}</DashboardShell>
    </ThemeProvider>
  );
}
