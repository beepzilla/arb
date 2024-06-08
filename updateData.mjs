import axios from 'axios';
import fs from 'fs';

const UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const QUICKSWAP_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/50519f57b0b77627e43df041c62d7970/subgraphs/id/5AK9Y4tk27ZWrPKvSAUQmffXWyQvjWqyJ2GNEZUWTirU';

async function fetchPoolsData(subgraphUrl, fileName) {
  let skip = 0;
  let allPools = [];

  while (true) {
    const query = {
      query: `
        {
          pools(first: 1000, skip: ${skip}) {
            id
            token0 {
              id
              symbol
              name
              decimals
              derivedMatic
            }
            token1 {
              id
              symbol
              name
              decimals
              derivedMatic
            }
            liquidity
            volumeUSD
            feesUSD
            createdAtTimestamp
          }
        }
      `
    };

    try {
      const response = await axios.post(subgraphUrl, query);
      const pools = response.data.data.pools;

      if (pools.length === 0) break;
      allPools = allPools.concat(pools);
      skip += 1000;
    } catch (error) {
      console.error('GraphQL errors:', error.response?.data?.errors);
      break;
    }
  }

  fs.writeFileSync(`./public/${fileName}.json`, JSON.stringify(allPools, null, 2));
  console.log(`Data written to ${fileName}.json`);
}

(async () => {
  console.log('Starting initial data update...');

  console.log('Starting to fetch Uniswap pools...');
  await fetchPoolsData(UNISWAP_SUBGRAPH_URL, 'uniswapchart');

  console.log('Starting to fetch QuickSwap pools...');
  await fetchPoolsData(QUICKSWAP_SUBGRAPH_URL, 'quickswapchart');

  console.log('Initial data update complete.');
})();
