import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';

// gets URI for a token in a collection
export const getTokenURI = async (_contractAddr, _tokenID) => {
  // console.log(
  //   '🔥🔥🔥 CONTRACT ADDR: ',
  //   _contractAddr,
  //   '🔥🔥🔥 TOKEN ID: ',
  //   _tokenID
  // );
  try {
    const data = await readContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'tokenURI',
      args: [_tokenID],
    });
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥 get token URI:  ', data);
    return data;
  } catch (err) {
    console.log('🔴 Error in getTokenURI: ', err.message);
  }
};
