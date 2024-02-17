import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';

// gets currently logged in user's collection
export const getNFTInfo = async (_contractAddr, _tokenId) => {
  try {
    const data = await readContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'getNFTInfo',
      args: [_tokenId],
    });
    const CID = data.CID;
    return { CID };
  } catch (err) {
    console.log('🔴 Error in getNFTInfo: ', err.message);
  }
};
