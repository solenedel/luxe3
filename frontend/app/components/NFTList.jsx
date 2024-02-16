import { v4 as uuidv4 } from 'uuid';

function NFTList({ metadataArray }) {
  return (
    <section className="flex gap-x-10 mt-10">
      {metadataArray.map((nft) => (
        <div key={uuidv4()}>
          <h4>{nft.name.slice(0, -4)}</h4>
          <img src={`${nft.imgLink}`} />
        </div>
      ))}
    </section>
  );
}

export default NFTList;
