import './globals.css';
import { Poppins } from 'next/font/google';
import { CartProvider } from '@/components/cart/CartContext';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Skultes Gym',
  description: 'Sporta zāle treniņiem vienatnē vai nelielās grupās',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-zinc-200 font-light antialiased dark:bg-zinc-800`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col items-center gap-4 p-4 sm:gap-8 sm:p-8">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
