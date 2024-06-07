const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

async function fetchPools(batchSize = 1000, skip = 0, minLiquidity = 0) {
  const query = `
    {
      pools(first: ${batchSize}, skip: ${skip}, where: { liquidity_gt: ${minLiquidity} }) {
        id
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
        feeTier
        liquidity
        token0Price
        token1Price
        totalValueLockedUSD
      }
    }
  `;

  try {
    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return [];
    }

    return data.data.pools || [];
  } catch (error) {
    console.error('Error fetching pools:', error);
    return [];
  }
}

async function updateData() {
  console.log('Starting to fetch pools...');
  console.log('Starting to fetch pools...');
  const allPools = [];
  const batchSize = 1000;
  const minLiquidity = 0; // Minimum liquidity

  let skip = 0;
  while (true) {
    console.log(`Fetching pools with skip: ${skip}`);
    console.log(`Fetching pools with skip: ${skip}`);
    const pools = await fetchPools(batchSize, skip, minLiquidity);
    console.log(`Fetched ${pools.length} pools with skip: ${skip}`);
    console.log(`Fetched ${pools.length} pools with skip: ${skip}`);
    if (pools.length === 0) break;
    allPools.push(...pools);
    skip += batchSize;
    console.log(`Fetched ${pools.length} pools... (skip: ${skip})`);
  }

  const filePath = path.join(__dirname, 'public', 'refinedPoolsData.json');
  fs.writeFileSync(filePath, JSON.stringify(allPools, null, 2));
  console.log('Data written to refinedPoolsData.json');
  console.log('Data written to refinedPoolsData.json');
  console.log('Data written to refinedPoolsData.json');
}

setInterval(updateData, 300000); // Run every 5 minutes
console.log('Starting initial data update...');
updateData().then(() => console.log('Initial data update complete.'));
