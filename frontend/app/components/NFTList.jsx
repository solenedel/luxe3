import { v4 as uuidv4 } from 'uuid';

function NFTList({ metadataArray }) {
  return (
    <section>
      {/* <h3>NFTs in your collection</h3> */}
      <ul>
        <div>
          {metadataArray.map((nft) => (
            <div key={uuidv4()}>
              <img src={`${nft.imgLink}`} />
            </div>
          ))}
        </div>
      </ul>
    </section>
  );
}

export default NFTList;
