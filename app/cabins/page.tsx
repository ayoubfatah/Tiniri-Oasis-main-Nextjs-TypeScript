import Link from 'next/link';
export const metadata: object = {
  title: 'cabins ',
  
};

export default async function Page() {
  return (
    <div>
      <h1>cabins page</h1>
      <Link href="/about">about us</Link>
      <ul></ul>
    </div>
  );
}
