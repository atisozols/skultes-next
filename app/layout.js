import './globals.css';
import { CartProvider } from '@/components/cart/CartContext';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'Ozols',
  description: 'Viss sākas šeit!',
};

export default function layout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-background`}>
        <ClerkProvider>
          <CartProvider>
            <div className="mx-auto flex min-h-screen flex-col items-center">{children}</div>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
