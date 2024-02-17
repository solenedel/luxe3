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
      args: [_tokenID],
    });

    // Extract CID from the URI
    const CID = data.split('ipfs://')[1].slice(0, -14);

    const IPFSurl = `https://gateway.pinata.cloud/ipfs/${CID}/metadata.json`;

    try {
      const response = await axios.get(IPFSurl);
      if (response.status === 200) {
        const metadata = response.data;
        return { metadata, CID };
      }
    } catch (err) {
      console.log('🔴 Error fetching metadata from axios:', err);
    }
  } catch (err) {
    console.log('🔴 Error in getMetadata: ', err.message);
  }
};
