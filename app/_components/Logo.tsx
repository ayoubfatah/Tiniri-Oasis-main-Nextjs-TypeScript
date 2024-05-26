import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <h1 className="text-xl font-semibold text-primary-100">Tiniri Oasis</h1>
    </Link>
  );
}

export default Logo;
