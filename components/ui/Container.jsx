'use client';

const Container = ({ children, onClick, className = '' }) => {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl bg-container ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Container;
