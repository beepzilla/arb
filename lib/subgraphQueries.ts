import { request, gql } from "graphql-request";

const UNISWAP_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

export const getPoolData = async (poolAddress: string) => {
  const query = gql`
    query($poolAddress: String!) {
      pool(id: $poolAddress) {
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
        reserve0
        reserve1
        volumeToken0
        volumeToken1
        token0Price
        token1Price
      }
    }
  `;

  const variables = { poolAddress };
  const data = await request(UNISWAP_SUBGRAPH_URL, query, variables);
  return data.pool;
};
