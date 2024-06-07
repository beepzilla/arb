import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

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
        liquidity
      }
    }
  `;
  const response = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  return data.pools;
}

async function updateData() {
  console.log('Starting to fetch pools...');
  const allPools = [];
  const batchSize = 1000;
  const minLiquidity = 0; // Minimum liquidity

  let skip = 0;
  while (true) {
    console.log(`Fetching pools with skip: ${skip}`);
    const pools = await fetchPools(batchSize, skip, minLiquidity);
    console.log(`Fetched ${pools.length} pools with skip: ${skip}`);
    if (pools.length === 0) break;
    allPools.push(...pools);
    skip += batchSize;
  }

  const filePath = path.join(process.cwd(), 'public', 'refinedPoolsData.json');
  fs.writeFileSync(filePath, JSON.stringify(allPools, null, 2));
  console.log('Data written to refinedPoolsData.json');
}

console.log('Starting initial data update...');
updateData().then(() => console.log('Initial data update complete.'));
setInterval(updateData, 600000); // Run every 10 minutes
