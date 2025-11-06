import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados globais do aplicativo
export const metadata: Metadata = {
  title: "NEXIO SYSTEM",
  description: "Painel de Performance Inteligente",
};

// Layout raiz envolvendo todas as páginas (App Router)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Children = páginas renderizadas */}
        {children}
      </body>
    </html>
  );
}
