// each key-value pair represents a different collection
// each object in an array represents a specific NFT

// STATUS represents the availability of the NFT:
// forSale: current owner has listed the NFT as FOR SALE, it us purchasable
// pendingSale: someone has paid for the NFT, the payment is held by the platform until physical item is received
// notForSale: current owner has listed the NFT as NOT FOR SALE, it cannot be purchased but others can see its page and 'favorite' the item
// if a notForSale item is added to someone's favourites, they can be alerted if/when the item is marked as forSale
export const collectionsList = {
  dior: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],

  chanel: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],
  hermes: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],
  prada: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],
  ysl: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],
  valentino: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],
  burberry: [
    {
      id: 1,
      name: 'brown bag',
      price: 0.43,
      status: 'forSale',
      owner: 'address',
      photo: '👜',
    },
    {
      id: 2,
      name: 'gold crown',
      price: 1.12,
      status: 'forSale',
      owner: 'address',
      photo: '👑',
    },
    ,
    {
      id: 3,
      name: 'pink purse',
      price: 0.29,
      status: 'forSale',
      owner: 'address',
      photo: '👛',
    },
    ,
    {
      id: 4,
      name: 'black bag',
      price: 0.48,
      status: 'pendingSale',
      owner: 'address',
      photo: '💼',
    },
    ,
    {
      id: 5,
      name: 'diamond ring',
      price: 0.94,
      status: 'forSale',
      owner: 'address',
      photo: '💍',
    },
  ],
};