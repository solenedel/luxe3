'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { collectionsList } from '../../../data/collections';

export default function CollectionPage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentCollection = pathname.split('/').pop();
  const collectionsObject = collectionsList;

  const [collection, setCollection] = useState(params.collection); // should this be intsantly set to params.collection?

  // useEffect(() => {
  //   console.log('CURRENT COLLECTION', currentCollection);
  // }, [currentCollection]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl text-center font-semibold mb-20">
        Collection: {collection}
      </h1>
      {/* NFT carousel */}
      <ul className="flex gap-x-16">
        {collectionsObject[collection].map((NFT) => (
          <li key={NFT.id} className="flex flex-col">
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
