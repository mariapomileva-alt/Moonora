import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moonora — Personalized bedtime storybooks",
  description:
    "Turn your child into the hero of their own magical hardcover bedtime book. Photo-personalized, illustrated, delivered worldwide.",
  openGraph: {
    title: "Moonora — Personalized bedtime storybooks",
    description:
      "Luxury personalized children’s books from your child’s photo — a keepsake they will remember forever.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-night-950 font-sans">
        {children}
      </body>
    </html>
  );
}
