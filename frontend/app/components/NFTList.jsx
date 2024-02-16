import { v4 as uuidv4 } from 'uuid';
import { useEffect, useContext } from 'react';
import { TokenListContext } from '@/context/TokenList.context';

function NFTList({ contractAddr, metadataArray }) {
  // const {
  //   tokenIdArray,
  //   setTokenIdArray,
  //   fetchLatestTokenNumber,
  //   latestTokenNumber,
  //   setLatestTokenNumber,
  //   generateTokenNumberArray,
  // } = useContext(TokenListContext);

  // useEffect(() => {
  //   console.log('in useeeefect');
  //   fetchLatestTokenNumber(contractAddr);
  //   generateTokenNumberArray();
  // }, []);

  return (
    <section className="flex gap-x-10 mt-10">
      {metadataArray.map((nft) => (
        <div key={uuidv4()}>
          <h4>{nft.name}</h4>
          <img src={`${nft.imgLink}`} />
        </div>
      ))}
    </section>
  );
}

export default NFTList;
