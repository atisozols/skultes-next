const Container = ({ children }) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-container">{children}</div>
  );
};

export default Container;
