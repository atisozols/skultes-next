import Link from 'next/link';

const HomeShortcuts = () => {
  return (
    <div className="flex gap-4 items-start justify-start flex-col sm:flex-row">
      <Link
        href={'/book'}
        className="md:text-xl text-white dark:text-foreground border-2 hover:underline hover:underline-offset-4 py-2 px-7 md:py-3 md:px-10 rounded-xl"
      >
        Pieteikties
      </Link>
    </div>
  );
};

export default HomeShortcuts;
