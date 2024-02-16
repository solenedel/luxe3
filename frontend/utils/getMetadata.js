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
    // const IPFSurl = `https://api.nft.storage/${CID}`;
    // const IPFSurl = `https://ipfs.io/ipfs/${CID}`;
    // const IPFSurl = `https://nftstorage.link/ipfs/${CID}`;
    // const IPFSurl = `https://${CID}.ipfs.nft.storage.link/`;

    try {
      const response = await axios.get(IPFSurl);
      if (response.status === 200) {
        const metadata = response.data;

        return metadata;
        // Now you can use the metadata object
      } else {
        console.error('Failed to retrieve metadata:', response.statusText);
      }
    } catch (err) {
      console.log('ERROR getting metadata ===', err);
    }
    // this is failing
    // console.log('FETCHING METADATA', response);
  } catch (err) {
    console.log('🔴 Error in getMetadata: ', err.message);
  }
};
