import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TableCheckbox, TableSortLabel } from '@/shared/components/MaterialTableElements';

const rows = [
  {
    id: 'name', disablePadding: true, label: 'Dessert (100g serving)',
  },
  {
    id: 'calories', disablePadding: false, label: 'Calories',
  },
  {
    id: 'fat', disablePadding: false, label: 'Fat (g)',
  },
  {
    id: 'carbs', disablePadding: false, label: 'Carbs (g)',
  },
  {
    id: 'protein', disablePadding: false, label: 'Protein (g)',
  },
];

const createSortHandler = (property, onRequestSort) => (event) => {
  onRequestSort(event, property);
};

const MatTableHead = ({
  onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
}) => {
  const rtl = useSelector(state => state.rtl);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <TableCheckbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {rows.map(row => (
          <TableCell
            key={row.id}
            align="left"
            padding={row.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id, onRequestSort)}
              className="material-table__sort-label"
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

MatTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default MatTableHead;
