import Link from 'next/link';

export default function Navigation() {
  return (
    <ul>
      <li className="list-none text-[20px]">
        <Link href="/">home</Link>
      </li>
      <li>
        <Link href="/cabins">Cabins</Link>
      </li>
      <li>
        <Link href="/account">Your Account</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}
