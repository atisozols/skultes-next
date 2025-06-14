import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

const TanstackQueryProvider = dynamic(() => import('@/context/providers/TanstackQueryProvider'), {
  ssr: false,
});

export const metadata = {
  title: 'Ozols | Sporta klubs',
  description: 'Jauns sporta klubs Tukumā!',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-96x96.png', sizes: '96x96' },
      { url: '/favicon-128x128.png', sizes: '128x128' },
      { url: '/favicon-196x196.png', sizes: '196x196' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },

  openGraph: {
    title: 'Ozols | Sporta klubs',
    description: 'Jauns sporta klubs Tukumā!',
    url: 'https://ozols.club',
    siteName: 'Ozols | Sporta klubs',
    images: [
      {
        url: '/social-share.png',
        width: 2295,
        height: 1531,
      },
    ],
    locale: 'lv_LV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ozols | Sporta klubs',
    description: 'Jauns sporta klubs Tukumā!',
    images: ['/social-share.png'],
  },
  manifest: '/site.webmanifest',
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
