const Main = ({ children, className = '' }) => (
  <main
    className={`relative flex w-full max-w-2xl flex-1 flex-col items-center pb-20 md:py-10 ${className}`}
  >
    {children}
  </main>
);

export default Main;
