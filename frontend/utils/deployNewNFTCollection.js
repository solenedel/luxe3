import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { contractAddress, ABI } from '@/constants/marketplace';

export const deployNewNFTCollection = async (_name, _symbol) => {
  //let _ethAddress = getAddress(_addr); // convert string to Eth address format
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: ABI,
      functionName: 'deployNewNFTCollection',
      args: [_name, _symbol],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash: hash,
    });

    console.log('DEPLOY NEW CONTRACT 🔥🔥🔥🔥🔥🔥🔥', data);
    return data;
  } catch (err) {
    console.log('🔴 Error in deployNewNFTCollection: ', err.message);
  }
};
