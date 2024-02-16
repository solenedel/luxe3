import { v4 as uuidv4 } from 'uuid';

import { useRouter, usePathname } from 'next/navigation';
function CollectionsList({ allCollections }) {
  const router = useRouter();
  return (
    <section className="flex gap-x-10 mt-10 text-xl">
      {allCollections.map((c) => (
        <div
          key={uuidv4()}
          onClick={() => router.push(`/collections/${c.contractAddress}`)}>
          <a className="hover:text-pink-600 hover:cursor-pointer">{c.name}</a>
        </div>
      ))}
    </section>
  );
}

export default CollectionsList;
