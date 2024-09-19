import Link from 'next/link';

const HomeShortcuts = () => {
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Link
        href={'/book'}
        className="text-xl text-white dark:text-foreground border-2 hover:underline hover:underline-offset-4 py-3 px-10 rounded-xl"
      >
        Pieteikties
      </Link>
    </div>
  );
};

export default HomeShortcuts;
