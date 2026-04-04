import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Budgetino',
  description: 'A cross-platform budget and subscription management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
