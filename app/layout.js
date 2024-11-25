import AppLayout from '@/components/AppLayout';

export const metadata = {
  title: 'Skultes Gym',
  description: 'Sporta zāle treniņiem vienatnē vai nelielās grupās',
};

export default function RootLayout({ children }) {
  return <AppLayout>{children}</AppLayout>;
}
