import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useTable, useGlobalFilter, usePagination, useSortBy, useResizeColumns, useRowSelect,
} from 'react-table';
import styled from 'styled-components';
import { scrollbarStyles } from '@/utils/palette';
import ReactTableHeader from './ReactTableHeader';
import BodyReactTable from './ReactTableBody';
import ReactTableFooter from './ReactTableFooter';
import ReactTableFilter from './ReactTableFilter';
import ReactTablePagination from './ReactTablePagination';
import { Table } from '../../TableElements';

const ReactTableConstructor = ({
  tableConfig, tableOptions, tableOptionalHook,
}) => {
  const {
    isEditable,
    isResizable,
    isSortable,
    withPagination,
    withSearchEngine,
    manualPageSize,
    placeholder,
    // server-side pagination flag lives in tableConfig
    serverSide,
    // loading state to disable pagination while fetching
    loading,
  } = tableConfig;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    state,
    rows,
    prepareRow,
    page,
    pageCount,
    pageOptions,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    setGlobalFilter,
    withDragAndDrop,
    updateDraggableData,
    updateEditableData,
    dataLength,
    state: { pageIndex, pageSize },
  } = useTable(
    tableOptions,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    ...tableOptionalHook,
  );

  // Prefer totalCount from tableConfig for server-side pagination counts
  const effectiveDataLength = (tableConfig && typeof tableConfig.totalCount === 'number')
    ? tableConfig.totalCount
    : (typeof tableOptions.dataLength === 'number' ? tableOptions.dataLength : rows.length);

  // Track if page size change is user-initiated (via dropdown) vs state update from Redux
  const userPageSizeChangeRef = useRef(false);
  const wrappedSetPageSize = (size) => {
    userPageSizeChangeRef.current = true;
    setPageSize(size);
  };

  // When in server-side mode, inform parent (Redux) on page changes
  const firstPageEffectRef = useRef(true);
  useEffect(() => {
    // skip first effect call on mount to avoid double fetch
    if (firstPageEffectRef.current) {
      firstPageEffectRef.current = false;
      return;
    }
    if (serverSide && typeof tableOptions.onPageChange === 'function') {
      // react-table pageIndex is 0-based; API expects 1-based
      tableOptions.onPageChange(pageIndex + 1, pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSide, pageIndex]);

  // When page size changes, inform parent so it can refetch with new per_page
  const firstSizeEffectRef = useRef(true);
  useEffect(() => {
    if (firstSizeEffectRef.current) {
      firstSizeEffectRef.current = false;
      return;
    }
    if (serverSide && userPageSizeChangeRef.current && typeof tableOptions.onPageSizeChange === 'function') {
      // debounce page size change to avoid rapid refetches
      const t = setTimeout(() => {
        tableOptions.onPageSizeChange(pageSize);
        userPageSizeChangeRef.current = false;
      }, 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSide, pageSize]);

  // Keep react-table's internal pageSize in sync with external (Redux) tableConfig.pageSize
  useEffect(() => {
    if (serverSide && typeof tableConfig?.pageSize === 'number' && tableConfig.pageSize !== pageSize) {
      // Update without marking as user-initiated to avoid dispatch loops
      setPageSize(tableConfig.pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSide, tableConfig?.pageSize]);

  return (
    <div>
      {withSearchEngine && (
        <ReactTableFilter
          rows={rows}
          setGlobalFilter={setGlobalFilter}
          setFilterValue={tableOptions.setFilterValue}
          globalFilter={state.globalFilter}
          placeholder={placeholder}
          dataLength={dataLength}
        />
      )}
      <TableWrap pagination={withPagination}>
        <Table
          {...getTableProps()}
          bordered
        >
          <ReactTableHeader
            headerGroups={headerGroups}
            isSortable={isSortable}
            isResizable={isResizable}
          />
          <BodyReactTable
            page={page}
            getTableBodyProps={getTableBodyProps}
            prepareRow={prepareRow}
            updateDraggableData={updateDraggableData}
            updateEditableData={updateEditableData}
            isEditable={isEditable}
            withDragAndDrop={withDragAndDrop}
          />
          {(pageCount === (pageIndex + 1) || (!withPagination && rows.length !== 0)) && (
            <ReactTableFooter
              footerGroups={footerGroups}
            />
          )}
        </Table>
      </TableWrap>
      {(withPagination && rows.length > 0) && (
        <ReactTablePagination
          page={page}
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
          setPageSize={wrappedSetPageSize}
          manualPageSize={manualPageSize}
          dataLength={effectiveDataLength}
          disabled={!!loading}
          totalLabel={tableConfig && tableConfig.totalLabel}
        />
      )}
    </div>
  );
};

ReactTableConstructor.propTypes = {
  tableConfig: PropTypes.shape({
    isEditable: PropTypes.bool,
    isResizable: PropTypes.bool,
    isSortable: PropTypes.bool,
    withDragAndDrop: PropTypes.bool,
    withPagination: PropTypes.bool,
    withSearchEngine: PropTypes.bool,
    manualPageSize: PropTypes.arrayOf(PropTypes.number),
    placeholder: PropTypes.string,
    serverSide: PropTypes.bool,
    loading: PropTypes.bool,
    totalCount: PropTypes.number,
    totalLabel: PropTypes.string,
  }),
  tableOptions: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
    })),
    data: PropTypes.arrayOf(PropTypes.shape()),
    setFilterValue: PropTypes.func,
    updateDraggableData: PropTypes.func,
    updateEditableData: PropTypes.func,
    defaultColumn: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.shape({
        Cell: PropTypes.func,
      }).isRequired,
    ]),
    isEditable: PropTypes.bool,
    withDragAndDrop: PropTypes.bool,
    dataLength: PropTypes.number,
  }),
  tableOptionalHook: PropTypes.arrayOf(PropTypes.func).isRequired,
};

ReactTableConstructor.defaultProps = {
  tableConfig: {
    isEditable: false,
    isResizable: false,
    isSortable: false,
    withDragAndDrop: false,
    withPagination: false,
    withSearchEngine: false,
    manualPageSize: [10, 20, 30, 40],
    placeholder: 'Search...',
  },
  tableOptions: [{
    columns: [],
    data: [],
    setFilterValue: () => {},
    updateDraggableData: () => {},
    updateEditableData: () => {},
    defaultColumn: [],
    withDragAndDrop: false,
    dataLength: null,
    disableSortBy: false,
    manualSortBy: false,
    manualGlobalFilter: false,
    manualPagination: false,
  }],
};

export default ReactTableConstructor;

// region STYLES

const TableWrap = styled.div`
  overflow-x: auto;

  ${scrollbarStyles};

  ${props => (props.pagination ? `
    margin-bottom: 1rem;
  ` : `
    height: 458px;
  
    tbody {
      top: 30px;
    }
  `)}
`;

// endregion
