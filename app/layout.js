import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ClerkProvider } from '@clerk/nextjs';
import UserDataProvider from '@/context/providers/UserDataProvider';

export const metadata = {
  title: 'Ozols | Sporta klubs',
  description: 'Jauns un moderns sporta klubs Tukumā.',
};

export default function layout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-background`}>
        <ClerkProvider>
          <UserDataProvider>
            <CartProvider>
              <div className="mx-auto flex min-h-screen w-full flex-col items-center">
                {children}
              </div>
            </CartProvider>
          </UserDataProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
