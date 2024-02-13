import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
export const getTokenIdList = async (_collectionAddr) => {
  try {
    const data = await readContract({
      address: _collectionAddr,
      abi: ABI,
      functionName: 'getTokenIdList',
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in getTokenIdList: ', err.message);
  }
};
