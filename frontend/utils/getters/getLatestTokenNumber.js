import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getAddress } from 'viem';

// gets latest token number for a collection
export const getLatestTokenNumber = async (_contractAddr) => {
  try {
    const data = await readContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'getLatestTokenNumber',
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in getLatestTokenNumber: ', err.message);
  }
};
