const FormElement = ({ children, className }) => {
  return (
    <div
      style={{ borderBottomWidth: '0.5px' }}
      className={`flex w-full items-center justify-between border-b-alternate px-4 py-1.5 ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default FormElement;
