import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col pt-16 items-center min-h-screen px-12 ">
      <div className="bg-white w-fit h-fit border-4 border-gray-950 rounded-sm">
        <h2 className="text-2xl tracking-wider py-2 text-center text-light italic text-rose-200 bg-gray-900">
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
        <button className="border-2 rounded-sm px-4 py-2 border-gray-900 bg-rose-200 hover:translate-y-1">
          <a href="/dashboard">Go to dashboard</a>
        </button>
      </div>
    </main>
  );
}
