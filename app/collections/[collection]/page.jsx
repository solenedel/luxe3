'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function CollectionPage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentCollection = pathname.split('/').pop();

  const [collection, setCollection] = useState(params.collection); // should this be intsantly set to params.collection?

  // useEffect(() => {
  //   console.log('CURRENT COLLECTION', currentCollection);
  // }, [currentCollection]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h2>this is the page for a specific NFT collection: {collection}</h2>
    </main>
  );
}

// export default client(CollectionPage);
