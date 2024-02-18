import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '@/constants/marketplace';
import { getAddress } from 'viem';
// gets currently logged in user info
export const getUser = async (_addr) => {
  const _ethAddr = getAddress(_addr);
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'getUser',
      args: [_ethAddr], // collection owner
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in getUser: ', err.message);
  }
};
