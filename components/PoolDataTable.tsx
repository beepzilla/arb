import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, Column } from 'react-table';

interface Token {
  id: string;
  symbol: string;
  price: number;
}

interface PoolData {
  id: string;
  token0: Token;
  token1: Token;
  liquidity: number;
  exchangeid: string;
}

interface PoolDataTableProps {
  logMessage: (message: string) => void;
}

const PoolDataTable: React.FC<PoolDataTableProps> = ({ logMessage }) => {
  const [data, setData] = useState<PoolData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uniswapResponse, quickswapResponse] = await Promise.all([
          axios.get('/uniswapchart.json'),
          axios.get('/quickswapchart.json')
        ]);
        const combinedData = [...uniswapResponse.data, ...quickswapResponse.data];
        setData(combinedData);
        logMessage('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching data:', error);
        logMessage('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [logMessage]);

  const columns: Column<PoolData>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Exchange',
        accessor: 'exchangeid',
      },
      {
        Header: 'Token 0',
        accessor: (row: PoolData) => row.token0.symbol,
        Cell: ({ value }: { value: string }) => <span>{value}</span>,
        id: 'token0Symbol'
      },
      {
        Header: 'Token 1',
        accessor: (row: PoolData) => row.token1.symbol,
        Cell: ({ value }: { value: string }) => <span>{value}</span>,
        id: 'token1Symbol'
      },
      {
        Header: 'Price 0',
        accessor: (row: PoolData) => row.token0.price,
        Cell: ({ value }: { value: number }) => <span>{value}</span>,
        id: 'price0'
      },
      {
        Header: 'Price 1',
        accessor: (row: PoolData) => row.token1.price,
        Cell: ({ value }: { value: number }) => <span>{value}</span>,
        id: 'price1'
      },
      {
        Header: 'Liquidity',
        accessor: 'liquidity',
        Cell: ({ value }: { value: number }) => <span>{value}</span>,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table {...tableInstance.getTableProps()}>
        <thead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...tableInstance.getTableBodyProps()}>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.getRowProps().key}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PoolDataTable;
