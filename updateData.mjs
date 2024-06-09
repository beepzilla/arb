import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const QUICKSWAP_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/50519f57b0b77627e43df041c62d7970/subgraphs/id/5AK9Y4tk27ZWrPKvSAUQmffXWyQvjWqyJ2GNEZUWTirU';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd';

const logFilePath = path.join(__dirname, 'public', 'logs.json');

const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message };

    let logs = [];
    try {
        const data = fs.readFileSync(logFilePath, 'utf8');
        logs = JSON.parse(data);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error('Error reading logs.json:', err);
        }
    }

    logs.push(logEntry);

    try {
        fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
    } catch (err) {
        console.error('Error writing to logs.json:', err);
    }
};

logMessage('updateData.mjs script started.'); // Initial log message

async function fetchPoolsData(subgraphUrl, queryFunc, transformFunc, fileName, exchangeId) {
    let skip = 0;
    let allPools = [];

    while (true) {
        try {
            logMessage(`Fetching pools data from ${exchangeId} with skip value: ${skip}`);
            const query = queryFunc(skip);
            const response = await axios.post(subgraphUrl, { query });
            const pools = response.data.data.pools;

            if (pools.length === 0) break;
            allPools = allPools.concat(pools.map(pool => transformFunc(pool, exchangeId)).filter(pool => parseFloat(pool.liquidity) > 0));
            logMessage(`Fetched ${pools.length} pools from ${exchangeId}, total: ${allPools.length}`);
            skip += 1000;
        } catch (error) {
            logMessage(`Error fetching pools data from ${exchangeId}: ${error.response?.data?.errors || error.message}`);
            break;
        }
    }

    try {
        fs.writeFileSync(`./public/${fileName}.json`, JSON.stringify(allPools, null, 2));
        logMessage(`Data written to ${fileName}.json`);
    } catch (writeError) {
        logMessage(`Error writing data to ${fileName}.json: ${writeError.message}`);
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
  logMessage('Starting initial data update...');

  logMessage('Starting to fetch Uniswap pools...');
  await fetchPoolsData(UNISWAP_SUBGRAPH_URL, uniswapQuery, transformUniswapData, 'uniswapchart', 'uniswap');

  logMessage('Starting to fetch QuickSwap pools...');
  await fetchPoolsData(QUICKSWAP_SUBGRAPH_URL, quickswapQuery, transformQuickswapData, 'quickswapchart', 'quickswap');

  logMessage('Initial data update complete.');
})();

// Set interval to update data every 5 minutes
setInterval(async () => {
  logMessage('Starting periodic data update...');

  logMessage('Starting to fetch Uniswap pools...');
  await fetchPoolsData(UNISWAP_SUBGRAPH_URL, uniswapQuery, transformUniswapData, 'uniswapchart', 'uniswap');

  logMessage('Starting to fetch QuickSwap pools...');
  await fetchPoolsData(QUICKSWAP_SUBGRAPH_URL, quickswapQuery, transformQuickswapData, 'quickswapchart', 'quickswap');

  logMessage('Periodic data update complete.');
}, 5 * 60 * 1000);

export { fetchPoolsData, logMessage };
