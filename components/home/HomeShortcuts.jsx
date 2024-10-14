import Link from 'next/link';

const HomeShortcuts = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 sm:flex-row">
      <Link
        href={'/book'}
        className="rounded-xl border-2 px-7 py-2 text-lg text-white hover:underline hover:underline-offset-4 md:px-10 md:py-3 md:text-xl dark:text-foreground"
      >
        Pieteikties
      </Link>
    </div>
  );
};

export default HomeShortcuts;
