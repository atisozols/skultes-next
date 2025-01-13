import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex h-full w-full max-w-xl flex-col items-start lg:max-w-5xl lg:flex-row lg:px-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
