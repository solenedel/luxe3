import { v4 as uuidv4 } from 'uuid';

import { useRouter, usePathname } from 'next/navigation';
function CollectionsList({ allCollections }) {
  const router = useRouter();
  return (
    <section className="flex gap-x-10 mt-10 text-xl">
      {allCollections.map((c) => (
        <div
          className="text-xl hover:cursor-pointer shadow-lg border-emerald-900 
           bg-gradient-to-br from-blue-600 to-blue-300 w-fit rounded-lg p-2 shadow-lg text-gray-950 hover:translate-y-1"
          key={uuidv4()}
          onClick={() => router.push(`/collections/${c.contractAddress}`)}>
          <a>{c.name}</a>
        </div>
      ))}
    </section>
  );
}

export default CollectionsList;
