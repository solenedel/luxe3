function Modal({ showModal, setShowModal }) {
  return (
    <section className="flex flex-col items-center justify-center fixed inset-0 z-50 bg-black/[0.8] text-white w-full h-full overflow-auto">
      <div className=" rounded-sm  flex flex-col items-center bg-yellow-50 text-gray-900 p-10 w-3/5">
        {' '}
        <header className="flex w-full px-10 justify-between">
          <h3 className="font-semibold self-center text-2xl">
            Create your NFT collection
          </h3>{' '}
          <button className="text-3xl" onClick={() => setShowModal(!showModal)}>
            ⓧ
          </button>
        </header>
        <form action="submit" className="mt-10 text-xl">
          <aside className="my-5 text-sky-500">
            Note: there is a limit of one collection per user. All your NFTs
            will be posted in this collection. After clicking on "create", you
            can start adding NFTs.
          </aside>
          Name of collection:
          <input
            type="text"
            placeholder="name..."
            className="ml-5 p-2 bg-sky-100 rounded-sm border-2 border-sky-300"
          />
          <button
            type="submit"
            className="text-xl font-semibold bg-gradient-to-br from-orange-400 to-violet-400 rounded-sm p-2 shadow-lg text-gray-900 hover:translate-y-1 ml-10">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default Modal;
