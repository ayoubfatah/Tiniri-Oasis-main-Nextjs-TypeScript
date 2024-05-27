import { Span } from 'next/dist/trace';
import Spinner from '@/app/_components/Spinner';

export default function Loading() {
  return <Spinner />;
}
