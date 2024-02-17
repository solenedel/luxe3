import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';

export const addCID = async (_CID, _tokenId, _contractAddr) => {
  try {
    const { request } = await prepareWriteContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'addCID',
      args: [_CID, _tokenId],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash: hash,
    });

    console.log('⭐⭐⭐⭐⭐ ADD CID ⭐⭐⭐⭐⭐', data);

    return data;
  } catch (err) {
    console.log('🔴 Error in deployNewNFTCollection: ', err.message);
  }
};
