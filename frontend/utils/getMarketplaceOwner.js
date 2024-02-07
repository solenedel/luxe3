import { readContract } from '@wagmi/core';
import { contractAddress, ABI } from '@/constants/marketplace';

export const getMarketplaceOwner = async () => {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'owner',
    });
    console.log('MARKETPLACE OWNER: ', data);
    return data;
  } catch (err) {
    console.log('🔴 Error in getMarketplaceOwner: ', err.message);
  }
};
