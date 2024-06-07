const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

console.log('Logs initialized.');
const fs = require('fs');
const path = require('path');

async function fetchPools(batchSize = 1000, skip, minTVL = 10000) {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
  const query = `
    {
      pools(first: ${batchSize}, skip: ${skip}, where: { totalValueLockedUSD_gt: ${minTVL} }) {
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

  console.log('Query being made:', query);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    console.log('Query result:', JSON.stringify(data, null, 2).slice(0, 500)); // Log first 500 characters of the result
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

(async () => {
  console.log('Starting to fetch pools...');
  console.log('Query process started.');
  const allPools = [];
  const batchSize = 1000;
  const totalPoolsToFetch = 26000;
  const minTVL = 10000; // Minimum Total Value Locked in USD

  let totalFetchedPools = 0;
  for (let skipBase = 0; totalFetchedPools < totalPoolsToFetch; skipBase += 5000) {
    for (let skip = 0; skip < 5000; skip += batchSize) {
      const actualSkip = skipBase + skip;
      if (actualSkip >= totalPoolsToFetch) break;
      console.log(`Fetching pools with skip: ${actualSkip}`);
      const pools = await fetchPools(batchSize, actualSkip, minTVL);
      console.log(`Fetched ${pools.length} pools with skip: ${actualSkip}`);
      if (pools.length > 0) {
        allPools.push(...pools);
        totalFetchedPools += pools.length;
      } else {
        break;
      }
      console.log(`Fetched ${pools.length} pools... (skip: ${actualSkip})`);
    }
    // Break out of the outer loop if fewer than batchSize pools are fetched in the last iteration
    if (totalFetchedPools % batchSize !== 0) {
      break;
    }
  }

  const filePath = path.join(__dirname, 'public', 'refinedPoolsData.json');
  console.log('Writing data to refinedPoolsData.json');
  fs.writeFileSync(filePath, JSON.stringify(allPools, null, 2));
  console.log('Data written to refinedPoolsData.json');
  console.log(`Checking if file exists: ${filePath}`);
  if (fs.existsSync(filePath)) {
    console.log('File exists.');
  } else {
    console.log('File does not exist.');
  }
  console.log('Data written to refinedPoolsData.json');
})();
