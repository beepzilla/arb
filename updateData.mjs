import axios from 'axios';
import fs from 'fs';

const UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const QUICKSWAP_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/50519f57b0b77627e43df041c62d7970/subgraphs/id/5AK9Y4tk27ZWrPKvSAUQmffXWyQvjWqyJ2GNEZUWTirU';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd';

async function fetchPoolsData(subgraphUrl, queryFunc, transformFunc, fileName, exchangeId) {
  let skip = 0;
  let allPools = [];

  while (true) {
    try {
      console.log(`Fetching pools data with skip value: ${skip}`);
      const query = queryFunc(skip);
      const response = await axios.post(subgraphUrl, { query });
      const pools = response.data.data.pools;

      if (pools.length === 0) break;
      allPools = allPools.concat(pools.map(pool => transformFunc(pool, exchangeId)).filter(pool => parseFloat(pool.liquidity) > 0));
      console.log(`Fetched ${pools.length} pools, total: ${allPools.length}`);
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

const uniswapQuery = (skip) => `
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
    liquidity
    volumeUSD
    feesUSD
    totalValueLockedUSD
    token0Price
    token1Price
  }
}
`;

const quickswapQuery = (skip) => `
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

const transformUniswapData = (pool, exchangeId) => ({
  id: pool.id,
  liquidity: pool.liquidity,
  token0: {
    id: pool.token0.id,
    symbol: pool.token0.symbol,
    name: pool.token0.name,
    price: (1 / pool.token1Price).toString() // Price of token0 in terms of token1
  },
  token1: {
    id: pool.token1.id,
    symbol: pool.token1.symbol,
    name: pool.token1.name,
    price: (1 / pool.token0Price).toString() // Price of token1 in terms of token0
  },
  volumeUSD: pool.volumeUSD,
  feesUSD: pool.feesUSD,
  totalValueLockedUSD: pool.totalValueLockedUSD,
  exchangeid: exchangeId
});

const transformQuickswapData = (pool, exchangeId) => {
  const price0 = pool.token1.derivedMatic; // Price of token0 in terms of MATIC
  const price1 = pool.token0.derivedMatic; // Price of token1 in terms of MATIC
  const priceInTermsOfToken0 = price1 / price0;
  const priceInTermsOfToken1 = price0 / price1;
  
  return {
    id: pool.id,
    liquidity: pool.liquidity,
    token0: {
      id: pool.token0.id,
      symbol: pool.token0.symbol,
      name: pool.token0.name,
      price: priceInTermsOfToken1.toString() // Price of token0 in terms of token1
    },
    token1: {
      id: pool.token1.id,
      symbol: pool.token1.symbol,
      name: pool.token1.name,
      price: priceInTermsOfToken0.toString() // Price of token1 in terms of token0
    },
    volumeUSD: pool.volumeUSD,
    feesUSD: pool.feesUSD,
    totalValueLockedUSD: pool.totalValueLockedUSD,
    exchangeid: exchangeId
  };
};

(async () => {
  console.log('Starting initial data update...');

  console.log('Starting to fetch Uniswap pools...');
  await fetchPoolsData(UNISWAP_SUBGRAPH_URL, uniswapQuery, transformUniswapData, 'uniswapchart', 'uniswap');

  console.log('Starting to fetch QuickSwap pools...');
  await fetchPoolsData(QUICKSWAP_SUBGRAPH_URL, quickswapQuery, transformQuickswapData, 'quickswapchart', 'quickswap');

  console.log('Initial data update complete.');
})();
