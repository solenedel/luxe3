export default function CollectionsPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-3xl font-semibold self-center">Our collections</h1>

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
