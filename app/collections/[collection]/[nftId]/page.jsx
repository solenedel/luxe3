'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { collectionsList } from '../../../../data/collections';

export default function NFTPage(params) {
  const [nftId, setNftId] = useState(params.params.nftId);
  const [collection, setcollection] = useState(params.params.collection);

  return (
    <main className="flex min-h-screen flex-col p-24">
      {console.log('PARAMS ==========')}
      Page for NFT: {nftId}, from collection: {collection}
    </main>
  );
}
