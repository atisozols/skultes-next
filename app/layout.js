import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Skultes Gym',
  description: 'Sporta zāle treniņiem vienatnē vai nelielās grupās',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-light antialiased bg-transparent`}>
        <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 gap-4 sm:gap-8 md:gap-12 bg-violet-100 dark:bg-zinc-900">
          {children}
        </div>
      </body>
    </html>
  );
}
