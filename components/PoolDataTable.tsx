"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useTable, Column } from 'react-table';
import { log } from '../lib/logger';

interface PoolData {
    id: string;
    exchangeid: string;
    liquidity: string;
    volume: string;
}

interface PoolDataTableProps {
    logMessage: (message: string) => void;
}

const PoolDataTable: React.FC<PoolDataTableProps> = ({ logMessage }) => {
    const [data, setData] = useState<PoolData[]>([]);

    const fetchData = useCallback(() => {
        log('fetchData function called');
        fetch('/quickswapchart.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                logMessage('Data fetched successfully');
            })
            .catch(error => logMessage(`Error fetching table data: ${error}`));
    }, [logMessage]);

    useEffect(() => {
        logMessage('PoolDataTable component mounted');
        fetchData();
    }, [fetchData]);

    const columns: Column<PoolData>[] = React.useMemo(
        () => [
            {
                Header: 'Pool ID',
                accessor: 'id'
            },
            {
                Header: 'Exchange ID',
                accessor: 'exchangeid'
            },
            {
                Header: 'Liquidity',
                accessor: 'liquidity'
            },
            {
                Header: 'Volume',
                accessor: 'volume'
            }
        ],
        []
    );

    const tableInstance = useTable({ columns, data });

    return (
        <table {...tableInstance.getTableProps()}>
            <thead>
                {tableInstance.headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, columnIndex) => (
                            <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...tableInstance.getTableBodyProps()}>
                {tableInstance.rows.map((row, rowIndex) => {
                    tableInstance.prepareRow(row);
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
    );
};

export default PoolDataTable;
