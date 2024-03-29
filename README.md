# Luxe3: NFT marketplace for luxury

[Demo video](https://www.loom.com/share/47207bd390764d9f818810b31317882e?sid=c3152b69-3026-4294-9fea-20f0977020c5)

[Link to vercel app](https://luxe3.vercel.app/)

Deployed on Sepolia.

## Running the frontend

⚠️ Note: If you want to run the project locally, make sure that the `contractAddress` variable in `frontend/constants/marketplace.js` is the one marked `// hardhat dev address`

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
