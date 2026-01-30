import './globals.css';
import type { Metadata } from 'next';
import { Syncopate, Space_Mono } from 'next/font/google';

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'Manthan Mittal | Industrial AI & Robotics',
  description: 'Portfolio of Manthan Mittal, AI & Robotics Engineer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syncopate.variable} ${spaceMono.variable}`}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
