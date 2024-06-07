declare module 'react-table' {
    import { ComponentType, ReactNode, useState } from 'react';
  
    export interface Column<T extends object = {}> {
      Header: string;
      accessor: keyof T;
    }
  
    export interface TableOptions<T extends object> {
      columns: Column<T>[];
      data: T[];
    }
  
    export interface TableInstance<T extends object> {
      getTableProps: (props?: any) => any;
      getTableBodyProps: (props?: any) => any;
      headerGroups: HeaderGroup<T>[];
      rows: Row<T>[];
      prepareRow: (row: Row<T>) => any;
      page: Row<T>[];
      canPreviousPage: boolean;
      canNextPage: boolean;
      pageOptions: number[];
      nextPage: () => void;
      previousPage: () => void;
      state: {
        pageIndex: number;
      };
    }
  
    export interface HeaderGroup<T extends object> {
      getHeaderGroupProps: (props?: any) => any;
      headers: Header<T>[];
    }
  
    export interface Header<T extends object> {
      getHeaderProps: (props?: any) => any;
      render: (header: string) => ReactNode;
    }
  
    export interface Row<T extends object> {
      getRowProps: (props?: any) => any;
      cells: Cell<T>[];
    }
  
    export interface Cell<T extends object> {
      getCellProps: (props?: any) => any;
      render: (cell: string) => ReactNode;
    }
  
    export function useTable<T extends object>(
      options: TableOptions<T>,
      ...plugins: any[]
    ): TableInstance<T>;
  
    export function usePagination<T extends object>(
      options: TableOptions<T>
    ): TableInstance<T>;
  }
  