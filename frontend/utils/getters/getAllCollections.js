import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '@/constants/marketplace';

export const getAllCollections = async () => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'allCollections',
    });
    console.log('COLLECTIONS🔥🔥🔥🔥🔥🔥🔥🔥 ', data);
    return data;
  } catch (err) {
    console.log('🔴 Error in getAllCollections: ', err.message);
  }
};
