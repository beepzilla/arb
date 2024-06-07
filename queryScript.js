const fetch = require('node-fetch');
const fs = require('fs');

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

  try {
    const response = await fetch(endpoint, {
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

(async () => {
  const allPools = [];
  const batchSize = 1000;
  const totalPoolsToFetch = 26000;
  const minTVL = 10000; // Minimum Total Value Locked in USD

  let totalFetchedPools = 0;
  for (let skipBase = 0; totalFetchedPools < totalPoolsToFetch; skipBase += 5000) {
    for (let skip = 0; skip < 5000; skip += batchSize) {
      const actualSkip = skipBase + skip;
      if (actualSkip >= totalPoolsToFetch) break;
      const pools = await fetchPools(batchSize, actualSkip, minTVL);
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

  fs.writeFileSync('refinedPoolsData.json', JSON.stringify(allPools, null, 2));
  console.log('Data written to refinedPoolsData.json');
})();
