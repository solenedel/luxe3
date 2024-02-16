import { v4 as uuidv4 } from 'uuid';
import { useEffect, useContext } from 'react';
import { TokenListContext } from '@/context/TokenList.context';

function NFTList({ contractAddr }) {
  const {
    tokenIdArray,
    setTokenIdArray,
    fetchLatestTokenNumber,
    latestTokenNumber,
    setLatestTokenNumber,
    generateTokenNumberArray,
  } = useContext(TokenListContext);

  // useEffect(() => {
  //   console.log('in useeeefect');
  //   fetchLatestTokenNumber(contractAddr);
  //   generateTokenNumberArray();
  // }, []);

  return (
    <section>
      <ul>
        <div>
          {tokenIdArray.map((nft) => (
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
