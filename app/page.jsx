import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen px-12">
      <section className="w-fit flex items-center justify-center relative">
        <h2 className="text-7xl leading-24 self-center z-10 absolute text-left px-20 text-sky-950 font-semibold">
          Your NFT <br /> marketplace for second-hand <br /> luxury.
        </h2>

        <div className="border-2 rounded-sm border-sky-800">
          <Image
            className="grayscale opacity-40 "
            src="/images/hero.png"
            alt="hero image"
            width="500"
            height="500"
          />
        </div>
      </section>
      <section className="text-sky-950 pt-20 pl-20">
        <h2 className="font-semibold text-2xl mb-5">Trending items</h2>
        <ul className="flex text-8xl gap-x-5 ">
          <li className="grayscale hover:cursor-pointer hover:grayscale-0">
            👜
          </li>
          <li className="grayscale hover:cursor-pointer hover:grayscale-0">
            👑
          </li>
          <li className="grayscale hover:cursor-pointer hover:grayscale-0">
            👛
          </li>
          <li className="grayscale hover:cursor-pointer hover:grayscale-0">
            💼
          </li>
          <li className="grayscale hover:cursor-pointer hover:grayscale-0">
            💍
          </li>
        </ul>
        <h2 className="font-semibold text-2xl mb-5 mt-20">
          Browse collections
          <div className="border-2 border-black rounded-sm">Search...</div>
        </h2>
        <button className="text-3xl font-semibold mt-20 bg-pink-900 rounded-sm p-4 shadow-lg text-pink-100">
          Sell an item
        </button>
      </section>
    </main>
  );
}
