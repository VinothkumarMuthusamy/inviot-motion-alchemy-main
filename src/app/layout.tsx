import type {Metadata} from 'next';
import './globals.css';

import { cn } from '@/lib/utils';
import { Saira } from 'next/font/google';
import ClientStylesLink from '@/components/ClientStylesLink';

const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Inviot Edge',
  description: 'Empowering collaboration through innovative audiovisual integration. Inviot provides leading AV solutions for corporate, education, and healthcare sectors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning={true}>
      <head>
        {/* Non-blocking load for noncritical styles moved to /public/noncritical.css */}
        <link rel="preload" href="/noncritical.css" as="style" />
        {/* noncritical.css will be appended by a Client Component to avoid server->client event handler warnings */}
        <noscript>
          <link rel="stylesheet" href="/noncritical.css" />
        </noscript>
      </head>
      <body className={cn(saira.variable, "font-body bg-background text-foreground antialiased")}>
        {children}
        {/* Client side loader for non-critical stylesheet */}
        <ClientStylesLink href="/noncritical.css" initialMedia="print" loadedMedia="all" />
      </body>
    </html>
  );
}
