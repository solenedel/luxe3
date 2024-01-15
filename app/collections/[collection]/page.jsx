'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { collectionsList } from '../../../data/collections';

export default function CollectionPage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  // const currentCollection = pathname.split('/').pop();
  const collectionsObject = collectionsList;

  const [collection, setCollection] = useState(params.collection); // should this be intsantly set to params.collection?

  useEffect(() => {
    console.log('========== PATHNAME!!!!!', typeof pathname);
    // console.log('========== PATHNAME!!!!!', typeof router.pathname);
  }, [pathname]);

  // ???
  const handleClick = (id) => {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥', pathname + '/' + id);
    // const newPathname = `${pathname + '/' + id}`;
    router.push(`/collections/dior/${id}`);
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl text-center font-semibold mb-20">
        Collection: {collection}
      </h1>
      {/* NFT carousel */}
      <ul className="flex w-full gap-x-24  justify-center">
        {collectionsObject[collection].map((NFT) => (
          <li
            onClick={() => handleClick(NFT.id)}
            key={NFT.id}
            className="hover:scale-105 hover:cursor-pointer w-2/3 items-center flex flex-col gap-y-2 shadow-xl border-2 border-gray-900 hover:bg-gray-900 hover:text-pink-50 rounded-md p-5">
            <span className="text-8xl">{NFT.photo}</span>
            <span className="text-lg">{NFT.name}</span>
            <span className="font-semibold text-xl">{NFT.price} ETH</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

// TODO:
// separate carousels for 'most viewed', 'most owners', etc
// BUG: the name of this page should be [page].jsx ?? or [collection]?
