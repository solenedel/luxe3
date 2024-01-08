import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen px-12">
      <div className="w-fit flex items-center justify-center relative mt-10">
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
          <span className="flex items-baseline justify-between">
            <h2 className="font-semibold text-2xl mb-5">Trending items</h2>
            <a href="" className="text-lg text-pink-700 hover:translate-x-1">
              See more ➤
            </a>
          </span>

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
          <button className="text-3xl font-semibold mt-20 border-2 border-gray-900 bg-gradient-to-br from-blue-300 to-pink-300 rounded-sm p-4 shadow-lg text-gray-900 hover:translate-y-1">
            Sell an item
          </button>
        </section>
      </div>

      <section className="mt-20">
        <h2 className="font-semibold text-2xl mb-5"> How does it work?</h2>
        <p>
          With Forever Luxe, you can buy or sell your pre-owned luxury items
          (designer bags, clothing, jewelry, etc) as NFTs. To be precise, each
          NFT on this website represents a RWA (Real-World Asset). When you
          purchase a Digital Twin (NFT) of a specific item, that item will be
          shipped to you.
        </p>

        <h2 className="font-semibold text-2xl mb-5 mt-8">
          {' '}
          What if I don&apos;t receive the item?
        </h2>
        <p>
          When you purchase the digital twin of your desired item, the funds
          will be temporarily held by us until you receive your item. The
          previous owner will only receive the payment once you have confirmed
          on your side that the physical item was received.
        </p>

        <h2 className="font-semibold text-2xl mb-5 mt-8">
          How can you guarantee authenticity?
        </h2>
        <p>
          All items added to our collections are authenticated by a THIRD PARTY,
          before they are listed as NFTs. If you have any doubts about
          authenticity after receiving the item, please contact us and we can
          arrange the third party to authenticate the item you received. If the
          item you received is revealed to be inauthentic, you will be refunded
          in full.
        </p>
      </section>
    </main>
  );
}
