import Image from 'next/image';

const loading = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-background">
      <Image
        src="/logo_red.png"
        alt="Ielādē"
        width={750}
        height={204}
        className="mx-auto w-full max-w-[200px]"
      />
    </div>
  );
};

export default loading;
