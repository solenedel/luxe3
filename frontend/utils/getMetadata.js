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

    // Construct full IPFS gateway URL
    const IPFSurl = `https://api.nft.storage/${CID}`;

    // const IPFSurl = `https://${CID}.ipfs.nft.storage.link/`;

    // console.log('URL ====', IPFSurl);
    try {
      const response = await axios.get(IPFSurl, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN}`,
        },
      });
      const metadata = await response.data;
      console.log('RESPONSE DATA ===', response.data);
      return metadata;
    } catch (err) {
      console.log('ERROR getting metadata ===', err);
    }
    // this is failing
    // console.log('FETCHING METADATA', response);
  } catch (err) {
    console.log('🔴 Error in getMetadata: ', err.message);
  }
};
