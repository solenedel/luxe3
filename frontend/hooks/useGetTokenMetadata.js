import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
import { getTokenMetadata } from '@/utils/getTokenMetadata';
export const useGetTokenMetadata = (metadataArray, setMetadataArray) => {
  // gets metadata for a single token and updates metadataArray for that collection
  const newFetchMetadata = async (_collectionAddr, _tokenId, _tokenIdArray) => {
    if (!_tokenIdArray.includes(metadataArray.length)) {
      const data = await getTokenMetadata(_collectionAddr, _tokenId);

      // console.log('metadatArray: ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐', metadataArray);

      const imgLink = `https://gateway.pinata.cloud/ipfs/${
        data.image.split('ipfs://')[1]
      }`;

      setMetadataArray((prev) => [
        ...prev,
        {
          imgLink: imgLink,
          ...data,
        },
      ]);

      return metadataArray; // not needed?
    }
  };

  // gets metadata for all tokens in a collection
  const newFetchMetadataForAllTokens = async (_collectionAddr) => {
    // setLatestTokenNum(Number(data));
    const data = await getLatestTokenNumber(_collectionAddr);
    const _latestTokenNumber = Number(data);

    let tokenIdArray = [];

    for (let i = 1; i < _latestTokenNumber + 1; i++) {
      tokenIdArray.push(i);
      await newFetchMetadata(_collectionAddr, i, tokenIdArray);
    }
    return tokenIdArray;
  };
  return { newFetchMetadataForAllTokens };
};
