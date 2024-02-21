import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col pt-16 items-center min-h-screen px-12 ">
      <div className="bg-white w-fit h-fit border-4 border-gray-950 rounded-sm">
        <h2 className="text-2xl tracking-wider py-2 text-center text-light italic text-emerald-400 bg-gray-900">
          Your NFT marketplace for second-hand luxury.
        </h2>
        <Image
          src="/images/Hero_img.png"
          width="700"
          height="300"
          className="grayscale opacity-50 "
        />
      </div>
      <div className="relative flex gap-x-24 z-50 bottom-64 text-2xl ">
        <button className="text-2xl shadow-lg font-semibold bg-gradient-to-br from-pink-700 to-pink-400 rounded-lg p-4 shadow-lg text-gray-900 tracking-wider hover:translate-y-1">
          <a href="/dashboard">Go to dashboard ➪</a>
        </button>
      </div>
    </main>
  );
}
