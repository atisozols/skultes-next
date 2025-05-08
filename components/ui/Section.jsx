'use client';

const Section = ({ title, children, className = '' }) => {
  return (
    <div className={`mx-auto flex w-full flex-col gap-3.5 px-5 py-3.5 ${className}`}>
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      {children}
    </div>
  );
};

export default Section;
