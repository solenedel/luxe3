export default function CollectionsPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-4xl font-semibold self-center backdrop-blur-sm rounded-lg">
        Browse collections
      </h1>
      <aside className="text-xl mt-14 italic text-center backdrop-blur-sm rounded-lg">
        You do not have a collection yet. Create your collection to get started
        with buying and selling on the marketplace.
      </aside>
      <section className="my-16 bg-gray-100/[0.5] text-gray-900 px-10 py-12 rounded-md">
        <h2 className="text-2xl mb-5 font-semibold">Most viewed 🔥</h2>
        <ul className="flex text-8xl w-full justify-evenly">
          <li className=" hover:cursor-pointer hover:grayscale-0">💼</li>
          <li className=" hover:cursor-pointer hover:grayscale-0">👠</li>
          <li className=" hover:cursor-pointer hover:grayscale-0">💍</li>
          <li className=" hover:cursor-pointer hover:grayscale-0">👛</li>
          <li className=" hover:cursor-pointer hover:grayscale-0">🥿</li>
          <li className=" hover:cursor-pointer hover:grayscale-0">👢</li>
        </ul>
      </section>
    </main>
  );
}
