
import type {Metadata} from 'next';
import './globals.css';

import { cn } from '@/lib/utils';
import { Montserrat, Open_Sans, Dancing_Script } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700', '900']
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400']
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '700']
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
      <body className={cn(montserrat.variable, openSans.variable, dancingScript.variable, "font-body bg-background text-foreground antialiased")}>
        {children}
      </body>
    </html>
  );
}
