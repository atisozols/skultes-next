import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const OrderLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex h-full w-full max-w-xl flex-1 flex-col items-start gap-4 sm:gap-8 lg:max-w-5xl lg:flex-row">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default OrderLayout;
