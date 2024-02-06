export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_creatorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
    ],
    name: 'NFTCollectionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPrice',
        type: 'uint256',
      },
    ],
    name: 'NFTPriceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'buyer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'soldFor',
            type: 'uint256',
          },
          {
            internalType: 'enum Marketplace.SaleStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        indexed: false,
        internalType: 'struct Marketplace.SaleInfo',
        name: 'saleInfo',
        type: 'tuple',
      },
    ],
    name: 'SaleInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum Marketplace.SaleStatus',
        name: 'prevStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum Marketplace.SaleStatus',
        name: 'newStatus',
        type: 'uint8',
      },
    ],
    name: 'SaleStatusChange',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
    ],
    name: 'deployNewNFTCollection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'saleStatus',
    outputs: [
      {
        internalType: 'enum Marketplace.SaleStatus',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_newPrice',
        type: 'uint256',
      },
    ],
    name: 'setNewPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
