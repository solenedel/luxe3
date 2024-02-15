import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getAddress } from 'viem';
export const mintNFT = async (_from, _URI, _contractAddr) => {
  // convert to ETH address
  let _ethAddrFrom = getAddress(_from);
  try {
    const { request } = await prepareWriteContract({
      address: _contractAddr,
      from: _ethAddrFrom,
      abi: ABI,
      functionName: 'safeMint',
      args: [_URI],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash: hash,
    });
    return data;
  } catch (err) {
    console.log('🔴 Error in mintNFT: ', err.message);
  }
};
