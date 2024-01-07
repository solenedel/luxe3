import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16">
      <div className="w-fit bg-white flex items-center justify-center relative">
        <h2 className="text-7xl leading-24 self-center z-10 absolute text-left px-20 text-orange-800 font-semibold">
          Your NFT <br /> marketplace for second-hand <br /> luxury.
        </h2>
        <Image
          className="grayscale opacity-40 rounded-sm"
          src="/images/hero.png"
          alt="hero image"
          width="700"
          height="700"
        />
      </div>

      {/* <div className="flex gap-x-32 mt-24 text-4xl font-semibold ">
        <button className="bg-gradient-to-t from-amber-900 to-amber-300 rounded-md p-3">
          Buy
        </button>
        <button className="bg-gradient-to-t from-amber-900 to-amber-300 rounded-md p-3">
          Sell
        </button>
      </div> */}
    </main>
  );
}
