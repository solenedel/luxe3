import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getAddress } from 'viem';

export const transferOwnership = async (
  _from,
  _to,
  _tokenId,
  _contractAddr
) => {
  const _ethTo = getAddress(_to);
  const _ethFrom = getAddress(_from);

  try {
    const { request } = await prepareWriteContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'transferOwnership',
      args: [_ethFrom, _ethTo, _tokenId],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash: hash,
    });

    console.log('⭐⭐⭐⭐⭐ TRANSFER OWNERSHIP ⭐⭐⭐⭐⭐', data);

    return data;
  } catch (err) {
    console.log('🔴 Error in deployNewNFTCollection: ', err.message);
  }
};
