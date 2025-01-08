import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

const BookLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <Navbar />
      <main className="flex h-full w-full max-w-xl flex-col items-start lg:max-w-5xl lg:flex-row lg:px-4">
        {children}
      </main>
      <Footer />
    </ClerkProvider>
  );
};

export default BookLayout;
