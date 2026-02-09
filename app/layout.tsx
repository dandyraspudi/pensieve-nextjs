import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Play } from "next/font/google";
import { BackgroundMusic } from "@/components/background-music";

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-play",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pensieve pokedex built with Next.js and GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${play.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundMusic />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
