import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import axios from 'axios';

// gets metadata for a token in a collection
export const getMetadata = async (_contractAddr, _tokenID) => {
  try {
    const data = await readContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'tokenURI',
      args: [_tokenID], // problem is here
    });
    console.log('33333333');
    // Extract CID from the URI
    const CID = data.split('ipfs://')[1];
    // Construct full IPFS gateway URL
    const IPFSurl = `https://ipfs.io/ipfs/${CID}`;

    const response = await axios.get(IPFSurl);
    const metadata = response.data;

    return metadata;
  } catch (err) {
    console.log('🔴 Error in getMetadata: ', err.message);
  }
};
