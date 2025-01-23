import { HiQrcode } from 'react-icons/hi';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

const ShortcutsPrototype = () => {
  return (
    <div className="mx-auto mt-4 flex w-full flex-col gap-4 px-4 md:flex-row lg:mt-8 lg:px-8">
      <div className="md:w-1/2">
        <div className="mx-auto w-full">
          <div className="flex w-full items-center justify-between rounded-3xl bg-white p-5 shadow-md transition-all hover:pr-4 dark:bg-background">
            <span>Publiskā zāle</span>
            <HiQrcode className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:w-1/2">
        <Link href={'/book'} className="mx-auto w-full">
          <div className="flex w-full items-center justify-between gap-5 rounded-3xl bg-white p-5 shadow-md transition-all hover:pr-4 dark:bg-background">
            <span>VIP zāle</span>
            <MdArrowForward className="h-5 w-5" />
          </div>
        </Link>
        <Link href={'/reservations'} className="mx-auto w-full">
          <div className="flex w-full items-center justify-between gap-5 rounded-3xl bg-white p-5 shadow-md transition-all hover:pr-4 dark:bg-background">
            <span>Manas rezervācijas</span>
            <MdArrowForward className="h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShortcutsPrototype;
