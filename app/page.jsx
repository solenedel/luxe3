import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-2xl self-center">
        Your NFT marketplace for second-hand luxury.
      </h2>
      <div className="flex gap-x-32 mt-24 text-4xl font-semibold ">
        <button className="bg-blue-950 rounded-sm p-3 text-white">Buy</button>
        <button className="bg-blue-950 rounded-sm p-3 text-white">Sell</button>
      </div>
    </main>
  );
}
