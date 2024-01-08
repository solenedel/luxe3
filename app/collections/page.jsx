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
            key="collection"
            className="bg-black w-fit p-2 font-semibold tracking-wide rounded-md text-gray-50 text-xl hover:bg-pink-800 hover:cursor-pointer hover:translate-y-1">
            {collection}
          </a>
        ))}
      </section>
      <section>
        <h1 className="text-3xl font-semibold self-center">
          Most viewed items
        </h1>
      </section>
      <section>
        <h1 className="text-3xl font-semibold self-center">Recently sold</h1>
      </section>
    </main>
  );
}
