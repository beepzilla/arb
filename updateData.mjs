import axios from 'axios';
import fs from 'fs';

const UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const QUICKSWAP_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/50519f57b0b77627e43df041c62d7970/subgraphs/id/5AK9Y4tk27ZWrPKvSAUQmffXWyQvjWqyJ2GNEZUWTirU';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd';

async function fetchPoolsData(subgraphUrl, query, fileName) {
  let skip = 0;
  let allPools = [];

  while (true) {
    try {
      const response = await axios.post(subgraphUrl, {
        query: query.replace('${skip}', skip)
      });
      const pools = response.data.data.pools;

      if (pools.length === 0) break;
      allPools = allPools.concat(pools);
      skip += 1000;
    } catch (error) {
      console.error('GraphQL errors:', error.response?.data?.errors);
      break;
    }
  }

  try {
    fs.writeFileSync(`./public/${fileName}.json`, JSON.stringify(allPools, null, 2));
    console.log(`Data written to ${fileName}.json`);
  } catch (writeError) {
    console.error('Error writing data to file:', writeError);
  }
}

async function fetchMaticToUsdPrice() {
  try {
    const response = await axios.get(COINGECKO_API_URL);
    return response.data['matic-network'].usd;
  } catch (error) {
    console.error('Error fetching MATIC to USD price:', error);
    return null;
  }
}

const uniswapQuery = `
{
  pools(first: 1000, skip: ${skip}) {
    id
    token0 {
      id
      symbol
      name
    }
    token1 {
      id
      symbol
      name
    }
    feeTier
    liquidity
    sqrtPrice
    token0Price
    token1Price
    volumeToken0
    volumeToken1
    volumeUSD
    feesUSD
    totalValueLockedToken0
    totalValueLockedToken1
    totalValueLockedUSD
    txCount
  }
}
`;

const quickswapQuery = `
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
`;

(async () => {
  console.log('Starting initial data update...');

  const maticToUsdPrice = await fetchMaticToUsdPrice();
  if (maticToUsdPrice === null) {
    console.error('Failed to fetch MATIC to USD price. Exiting.');
    return;
  }

  console.log(`MATIC to USD price: ${maticToUsdPrice}`);

  console.log('Starting to fetch Uniswap pools...');
  await fetchPoolsData(UNISWAP_SUBGRAPH_URL, uniswapQuery, 'uniswapchart');

  console.log('Starting to fetch QuickSwap pools...');
  await fetchPoolsData(QUICKSWAP_SUBGRAPH_URL, quickswapQuery, 'quickswapchart');

  console.log('Initial data update complete.');
})();
