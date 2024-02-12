import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { getAddress } from 'viem';
export const mintNFT = async (_to, _URI, _contractAddr) => {
  // convert to ETH address
  let _ethAddrTo = getAddress(_to);
  let _ethContradctAddr = getAddress(_contractAddr);

  // console.log('???????', _to, _ethAddrTo);
  try {
    const { request } = await prepareWriteContract({
      address: _ethContradctAddr,
      abi: ABI,
      functionName: 'safeMint',
      args: [_ethAddrTo, _URI],
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
