import Image from 'next/image';

const loading = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-accent">
      <Image
        src="/logo_black.png"
        alt="Ielādē"
        width={750}
        height={204}
        className="mx-auto w-3/4 max-w-sm"
      />
    </div>
  );
};

export default loading;
