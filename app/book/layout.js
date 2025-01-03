import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const BookLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex h-full w-full max-w-xl flex-col items-start lg:max-w-5xl lg:flex-row">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BookLayout;
