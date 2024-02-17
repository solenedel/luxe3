import { v4 as uuidv4 } from 'uuid';

function NFTList({ metadataArray, account, owner }) {
  return (
    <section className="flex gap-x-10 mt-10">
      {metadataArray.map((nft) => (
        <div key={uuidv4()}>
          <h4>{nft.name.slice(0, -4)}</h4>
          <img src={`${nft.imgLink}`} />
          {account != owner ? (
            <button className="text-xl mt-2 shadow-lg border-emerald-900 font-semibold bg-gradient-to-br from-emerald-800 to-emerald-500 rounded-lg p-1 shadow-lg text-gray-950 hover:translate-y-1">
              Buy
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
    </section>
  );
}

export default NFTList;
