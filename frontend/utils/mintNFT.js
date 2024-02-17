import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { useContext } from 'react';
import { getAddress } from 'viem';
import { getMetadata } from './getMetadata';
import { TokenListContext } from '@/context/TokenList.context';
import { getLatestTokenNumber } from './getters/getLatestTokenNumber';
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

    // const latest = await getLatestTokenNumber(_contractAddr);

    // // get metadata
    // const { CID } = await getMetadata(_contractAddr, latest);

    // console.log('CID ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐', CID);
    // now upload the CID to the smart contract

    return { data };
  } catch (err) {
    console.log('🔴 Error in mintNFT: ', err.message);
  }
};
