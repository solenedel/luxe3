import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '@/constants/marketplace';
import { getAddress } from 'viem';
// gets currently logged in user's collection
export const getCollection = async (_ownerAddr) => {
  const _ethAddr = getAddress(_ownerAddr);
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getCollection',
      args: [_ethAddr], // collection owner
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in getCollection: ', err.message);
  }
};
