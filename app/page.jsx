import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16">
      <section className="text-red-100">
        <h2>Trending</h2>
        <ul>
          <li></li>
        </ul>
      </section>
      <section className="w-fit bg-white flex items-center justify-center relative">
        <h2 className="text-7xl leading-24 self-center z-10 absolute text-left px-20 text-orange-800 font-semibold">
          Your NFT <br /> marketplace for second-hand <br /> luxury.
        </h2>

        <Image
          className="grayscale opacity-40"
          src="/images/hero.png"
          alt="hero image"
          width="500"
          height="500"
        />
      </section>
    </main>
  );
}
