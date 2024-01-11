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
      <h1 className="text-2xl text-center font-semibold">
        Collection: {collection}
      </h1>
      <section>👜 👑 👛 💼 💍</section>
    </main>
  );
}

// export default client(CollectionPage);
