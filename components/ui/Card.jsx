const Card = ({ children }) => {
  return (
    <div className="mx-auto mt-4 w-full px-4 lg:mt-8 lg:px-8">
      <div className="flex w-full flex-col gap-5 rounded-3xl bg-white p-5 shadow-md dark:bg-background">
        {children}
      </div>
    </div>
  );
};

export default Card;
