"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FaUsers, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the access token cookie
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to login page
    router.push("src/app/page.tsx");
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container">
          <nav className="navbar">
            <Image
              src="/images/logo.png"
              width={500}
              height={500}
              alt="Logo"
              className="logo"
            />
            <h1>Admin</h1>
            <p>Dzongkha Letters and Numbers Tracing</p>
            <div className="divider"></div>
            <ul>
              <li>
                <Link href="/userManagement">
                  <FaUsers className="icon" /> User Management
                </Link>
              </li>
              <li>
                <Link href="/feedbackManagement">
                  <FaCommentDots className="icon" /> Feedback Management
                </Link>
              </li>
            </ul>
            <div className="divider"></div>
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </nav>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
