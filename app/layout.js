import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

const TanstackQueryProvider = dynamic(() => import('@/context/providers/TanstackQueryProvider'), {
  ssr: false,
});

export const metadata = {
  title: 'Ozols | Sporta klubs',
  description: 'Jauns un moderns sporta klubs Tukumā.',
};

export default function layout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-background`}>
        <ClerkProvider>
          <CartProvider>
            <TanstackQueryProvider>
              <div className="mx-auto flex min-h-screen w-full flex-col items-center">
                {children}
              </div>
            </TanstackQueryProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
