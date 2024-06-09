// columns.ts
import { Column } from 'react-table';
import { PoolData } from './types';

export const columns: Column<PoolData>[] = [
    {
        Header: 'Pair',
        accessor: 'id',
        Cell: ({ row }) => `${row.original.token0.symbol}/${row.original.token1.symbol}`,
    },
    {
        Header: 'Token0 Address',
        accessor: 'token0.id',
    },
    {
        Header: 'Token1 Address',
        accessor: 'token1.id',
    },
    {
        Header: 'Token0 Price',
        accessor: 'token0.price',
    },
    {
        Header: 'Token1 Price',
        accessor: 'token1.price',
    },
    {
        Header: 'Liquidity',
        accessor: 'liquidity',
    },
    {
        Header: 'Volume (USD)',
        accessor: 'volumeUSD',
    },
    {
        Header: 'Exchange ID',
        accessor: 'exchangeid',
    }
];
