import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFlexLayout } from 'react-table';
import ReactTableConstructor from './components/ReactTableConstructor';
import ReactTableCell from './components/ReactTableCell';
import ReactTableCellEditable from './components/ReactTableEditableCell';

const ReactTableBase = ({
  tableConfig,
  columns,
  data,
  updateDraggableData,
  updateEditableData,
}) => {
  const {
    isEditable,
    isResizable,
    isSortable,
    withDragAndDrop,
    withPagination,
    withSearchEngine,
    manualPageSize,
    // server-side pagination support
    serverSide,
    pageCount: serverPageCount,
    pageIndex: serverPageIndex,
    pageSize: serverPageSize,
    onPageChange,
    onPageSizeChange,
  } = tableConfig;
  const [filterValue, setFilterValue] = useState(null);
  const tableOptions = {
    columns,
    data,
    updateDraggableData,
    updateEditableData,
    setFilterValue,
    defaultColumn: {},
    isEditable,
    withDragAndDrop: withDragAndDrop || false,
    dataLength: data.length,
    autoResetPage: false,
    disableSortBy: !isSortable,
    manualSortBy: !isSortable,
    manualGlobalFilter: !withSearchEngine,
    // If serverSide is true, we enable manualPagination regardless of withPagination
    manualPagination: !!serverSide || !withPagination,
    // react-table expects pageCount when manualPagination is true
    pageCount: serverSide ? (serverPageCount ?? 0) : undefined,
    // expose callbacks so constructor can trigger Redux actions
    onPageChange,
    onPageSizeChange,
    initialState: {
      pageIndex: serverSide && typeof serverPageIndex === 'number' ? serverPageIndex : 0,
      pageSize: serverSide && typeof serverPageSize === 'number'
        ? serverPageSize
        : (manualPageSize ? manualPageSize[0] : 10),
      globalFilter: withSearchEngine && filterValue ? filterValue : undefined,
    },
  };

  let tableOptionalHook = [];
  if (isResizable) tableOptionalHook = [useFlexLayout];
  if (withSearchEngine) {
    tableOptions.defaultColumn = {
      Cell: ReactTableCell,
    };
  }
  if (isEditable) {
    tableOptions.defaultColumn = {
      Cell: ReactTableCellEditable,
    };
  }

  return (
    <ReactTableConstructor
      key={isResizable || isEditable ? 'modified' : 'common'}
      tableConfig={tableConfig}
      tableOptions={tableOptions}
      tableOptionalHook={tableOptionalHook}
    />
  );
};

ReactTableBase.propTypes = {
  tableConfig: PropTypes.shape({
    isEditable: PropTypes.bool,
    isResizable: PropTypes.bool,
    isSortable: PropTypes.bool,
    withDragAndDrop: PropTypes.bool,
    withPagination: PropTypes.bool,
    withSearchEngine: PropTypes.bool,
    manualPageSize: PropTypes.arrayOf(PropTypes.number),
  }),
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
  })),
  data: PropTypes.arrayOf(PropTypes.shape()),
  updateDraggableData: PropTypes.func,
  updateEditableData: PropTypes.func,
};

ReactTableBase.defaultProps = {
  tableConfig: {
    isEditable: false,
    isResizable: false,
    isSortable: false,
    withDragAndDrop: false,
    withPagination: false,
    withSearchEngine: false,
    manualPageSize: [],
  },
  columns: [
    { Header: '#', accessor: 'id' },
    { Header: 'Header Example Title one', accessor: 'first' },
    { Header: 'Header Example Title two', accessor: 'last' },
  ],
  data: [
    { id: 1, first: 'Cell Example Data one', last: 'Cell Example Data two' },
    { id: 2, first: 'Cell Example Data three', last: 'Cell Example Data four' },
  ],
  updateDraggableData: () => {},
  updateEditableData: () => {},
};

export default ReactTableBase;
