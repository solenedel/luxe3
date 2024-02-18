import { getLatestTokenNumber } from '@/utils/getters/getLatestTokenNumber';
export const useGetTokenMetadata = ({ metadataArray, setMetadataArray }) => {
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
  const newFetchMetadataForAllTokens = async (_collectionAddr, _tokenId) => {
    // setLatestTokenNum(Number(data));
    const _latestTokenNumber = await getLatestTokenNumber(_collectionAddr);

    for (let i = 1; i < _latestTokenNumber + 1; i++) {
      const data = await newFetchMetadata(_collectionAddr, _tokenId);
      console.log('newFetchMetadataForAllTokens=========', data);
      // return data;
    }
  };
  return { newFetchMetadataForAllTokens, newFetchMetadata };
};
