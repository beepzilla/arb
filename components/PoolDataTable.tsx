import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useTable,
  usePagination,
  Column,
  HeaderGroup,
  Row,
  Cell,
  TableOptions,
} from 'react-table';

interface Token {
  symbol: string;
}

interface PoolData {
  id: string;
  token0: Token;
  token1: Token;
  liquidity: number;
  totalValueLockedUSD: number;
}

const PoolDataTable: React.FC = () => {
  const [data, setData] = useState<PoolData[]>([]);
  const pageSize = 100;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/public/refinedPoolsData.json');
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns: Column<PoolData>[] = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      {
        Header: 'Token 0',
        accessor: 'token0.symbol' as keyof PoolData,
        Cell: ({ value }: { value: string }) => value,
        id: 'token0Symbol'
      },
      {
        Header: 'Token 1',
        accessor: 'token1.symbol' as keyof PoolData,
        Cell: ({ value }: { value: string }) => value,
        id: 'token1Symbol'
      },
      { Header: 'Liquidity', accessor: 'liquidity' },
      { Header: 'TVL (USD)', accessor: 'totalValueLockedUSD' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable<PoolData>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize },
    } as TableOptions<PoolData>,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<PoolData>, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, colIndex) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                  key={colIndex}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: Row<PoolData>, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell: Cell<PoolData>, cellIndex) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                      key={cellIndex}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default PoolDataTable;
