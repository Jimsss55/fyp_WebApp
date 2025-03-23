// app/layout.tsx
"use-client";

import { usePathname } from "next/navigation";
import LoginLayout from "./LoginLayout";
import AdminLayout from "./AdminLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current route is the root route (`/`)
  const isLoginPage = pathname === "/"; // Adjust this condition based on your routing structure

  if (isLoginPage) {
    return <LoginLayout>{children}</LoginLayout>;
  }

  // For all other routes, use the AdminLayout
  return <AdminLayout>{children}</AdminLayout>;
}
