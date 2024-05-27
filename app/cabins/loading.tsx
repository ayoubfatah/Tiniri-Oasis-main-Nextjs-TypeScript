import Spinner from '../_components/Spinner';

export default function loading() {
  return (
    <div className="grid items-center h-lvh justify-center">
      <div>
        <Spinner />
        <p>Loading cabins ...</p>
      </div>
    </div>
  );
}
