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
    console.log('CID', CID);
    // Construct full IPFS gateway URL
    const IPFSurl = `https://api.nft.storage/${CID}`;
    // const IPFSurlBackup = `https://cloudflare-ipfs.com/ipfs/${CID}`;

    console.log('URL: ====', IPFSurl);
    try {
      const response = await axios.get(IPFSurl);
      const metadata = await response.data;
      console.log('RESP ===', response);
      return metadata;
    } catch (err) {
      console.log('ERROR ===', err);
    }
    // this is failing
    // console.log('FETCHING METADATA', response);
  } catch (err) {
    console.log('🔴 Error in getMetadata: ', err.message);
  }
};
