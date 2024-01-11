export default function CollectionsPage() {
  const collections = [
    'Dior',
    'Saint Laurent',
    'Valentino',
    'Prada',
    'Burberry',
    'Chanel',
    'Hermès',
  ];

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-3xl font-semibold self-center">Our collections</h1>
      <section className="mt-20 flex gap-x-10 mb-20">
        {collections.map((collection) => (
          <a
            href={`collections/${collection.toLowerCase()}`}
            key="collection"
            className="bg-black w-fit p-2 font-semibold tracking-wide rounded-md text-blue-50 text-xl hover:bg-sky-700 hover:cursor-pointer hover:translate-y-1">
            {collection}
          </a>
        ))}
      </section>
      <section className="my-16">
        <h1 className="text-3xl font-semibold">Most viewed items</h1>
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
      </section>
      <section>
        <h1 className="text-3xl font-semibold">Recently sold</h1>
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
      </section>
    </main>
  );
}
