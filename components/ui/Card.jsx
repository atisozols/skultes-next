const Card = ({ children }) => {
  return (
    <div className="mt-4 w-full px-4 lg:mt-8 lg:px-8 lg:pl-0">
      <div className="flex w-full flex-col gap-7 rounded-3xl bg-white p-7 shadow-md dark:bg-background">
        {children}
      </div>
    </div>
  );
};

export default Card;
