// types.ts
export interface Token {
    id: string;
    symbol: string;
    name: string;
    price: string;
}

export interface PoolData {
    id: string;
    token0: Token;
    token1: Token;
    liquidity: string;
    volumeUSD: string;
    feesUSD: string;
    exchangeid: string;
}
