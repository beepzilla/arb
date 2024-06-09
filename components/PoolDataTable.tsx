// PoolDataTable.tsx
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useTable, usePagination } from 'react-table';
import { log } from '../lib/logger';
import { PoolData } from './types';
import { fetchData } from './fetchData';
import { columns } from './columns';

interface PoolDataTableProps {
    logMessage: (message: string) => void;
}

const PoolDataTable: React.FC<PoolDataTableProps> = ({ logMessage }) => {
    const [data, setData] = useState<PoolData[]>([]);

    const fetchDataCallback = useCallback(() => {
        fetchData(setData, logMessage);
    }, [logMessage]);

    useEffect(() => {
        logMessage('PoolDataTable component mounted');
        fetchDataCallback();
    }, [fetchDataCallback]);

    const tableInstance = useTable<PoolData>(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 100 } as Partial<any>
        },
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex }
    } = tableInstance;

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PoolDataTable;
