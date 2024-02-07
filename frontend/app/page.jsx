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
          Sell
        </button>
        <button className="border-2 rounded-sm px-4 py-2 border-gray-900 bg-rose-200 hover:translate-y-1">
          Browse
        </button>
        {/* <button className="text-3xl shadow-lg border-emerald-900 font-semibold mt-20 bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-4 shadow-lg text-gray-950 hover:translate-y-1">
          Sell
        </button>
        <button className="text-3xl shadow-lg border-emerald-900 font-semibold mt-20 bg-gradient-to-bl from-emerald-800 to-emerald-500 rounded-lg p-4 shadow-lg text-gray-950 hover:translate-y-1">
          Browse
        </button> */}
      </div>

      <div className="w-fit flex items-center justify-center relative mt-10">
        {/* <section className="text-sky-950 pt-20 pl-20"> */}
        {/* <span className="flex items-baseline justify-between">
            <a
              href=""
              className="text-gray-900 font-semibold mb-4 text-xl hover:translate-x-2">
              Trending items ➤
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
          </ul> */}
        {/* <h2 className="font-semibold text-2xl mb-5 mt-20">
            Browse collections
            <div className="border-2 border-black rounded-sm">Search...</div>
          </h2> */}
        {/* <div className="flex gap-x-10">
            {' '}
           
          </div> */}
        {/* </section> */}
      </div>

      {/* <section className="mt-20">
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
      </section> */}
    </main>
  );
}
