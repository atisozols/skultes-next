import './globals.css';
import { Poppins } from 'next/font/google';
import { CartProvider } from '@/components/cart/CartContext';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Sporta klubs "Ozols"',
  description: 'Sporta zāle treniņiem vienatnē vai nelielās grupās',
};

export default function layout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.className} bg-zinc-100 font-light antialiased dark:bg-zinc-800`}
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col items-center">{children}</div>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
