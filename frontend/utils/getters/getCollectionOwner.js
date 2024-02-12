import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';

export const getCollectionOwner = async (_contractAddr) => {
  try {
    const data = await readContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'owner',
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in getCollectionOwner: ', err.message);
  }
};
