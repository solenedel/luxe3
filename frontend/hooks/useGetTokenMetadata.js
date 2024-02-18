import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
import { getTokenMetadata } from '@/utils/getTokenMetadata';
export const useGetTokenMetadata = (
  metadataArray,
  setMetadataArray,
  latestTokenNum
) => {
  // gets metadata for a single token and updates metadataArray for that collection
  const newFetchMetadata = async (_collectionAddr, _tokenId) => {
    const data = await getTokenMetadata(_collectionAddr, _tokenId);

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
  };

  // gets metadata for all tokens in a collection
  const newFetchMetadataForAllTokens = async (_collectionAddr) => {
    // setLatestTokenNum(Number(data));
    // const data = await getLatestTokenNumber(_collectionAddr);
    // const _latestTokenNumber = Number(data);

    for (let i = 1; i < latestTokenNum + 1; i++) {
      await newFetchMetadata(_collectionAddr, i);
    }
  };
  return { newFetchMetadataForAllTokens };
};
