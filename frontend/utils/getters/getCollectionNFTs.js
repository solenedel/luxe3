import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '@/constants/marketplace';
import { getAddress } from 'viem';

export const getCollectionNFTs = async (_ownerAddr) => {
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
    console.log('🔴 Error in getCollectionNFTs: ', err.message);
  }
};
