import type {Metadata} from 'next';
import './globals.css';

import { cn } from '@/lib/utils';
import { Saira } from 'next/font/google';

const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Inviot Edge',
  description: 'Empowering collaboration through innovative audiovisual integration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning={true}>
      <body className={cn(saira.variable, "font-body bg-background text-foreground antialiased")}>
        {children}
      </body>
    </html>
  );
}