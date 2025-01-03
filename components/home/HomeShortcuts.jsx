import Link from 'next/link';

const HomeShortcuts = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
      <Link
        href={'/book'}
        className="max-w-sm rounded-md bg-background p-2 px-3 text-center text-base text-white shadow-lg hover:underline hover:underline-offset-4 sm:max-w-md dark:bg-foreground dark:text-background"
      >
        Rezervēt
      </Link>
    </div>
  );
};

export default HomeShortcuts;
