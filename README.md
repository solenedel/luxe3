# Luxe3: NFT marketplace for luxury

[Link to vercel app](https://luxe3.vercel.app/)

Deployed on Sepolia.

## Running the frontend

This is a Next.js project.

`cd frontend`
`npm install`
`npm run dev` to run the development server.

## Running the backend

This is a Hardhat project. Make sure to `cd backend` before running any of the commands below.

Running the unit tests:
`npm test` or `npx hardhat coverage` for more info.

Running the hardhat project locally:

1. In one terminal window: `npx hardhat node`

2. In another terminal window: `npx hardhat run scripts/deployMarketplace.js --network localhost`
