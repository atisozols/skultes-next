'use client';
import '../app/globals.css';
import { Poppins } from 'next/font/google';
import { CartProvider } from '@/components/cart/CartContext';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-violet-100 font-light antialiased dark:bg-zinc-900`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-8 sm:p-8">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
