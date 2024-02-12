import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
// how to get the actual contract address?
export const mintNFT = async (_to, _URI) => {
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress, // get contract addr from context!!
      abi: ABI,
      functionName: 'safeMint',
      args: [_to, _URI],
    });

    const { hash } = await writeContract(request);
    const data = await waitForTransaction({
      hash: hash,
    });
    console.log('MINT NFT 🔥🔥🔥🔥🔥🔥🔥', data);
    return data;
  } catch (err) {
    console.log('🔴 Error in mintNFT: ', err.message);
  }
};
