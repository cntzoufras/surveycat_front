import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import TableBody from '@material-ui/core/TableBody';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';
import {
 Table, TableCheckbox, TableRow, TableWrap, TablePagination, TableCell, 
} from '@/shared/components/MaterialTableElements';
import MatTableHead from './MatTableHead';
import MatTableToolbar from './MatTableToolbar';

let counter = 0;

const createData = (name, calories, fat, carbs, protein) => {
  counter += 1;
  return {
    id: counter, name, calories, fat, carbs, protein,
  };
};

const getSorting = (order, orderBy) => {
  if (order === 'desc') {
    return (a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      return 0;
    };
  }
  return (a, b) => {
    if (a[orderBy] > b[orderBy]) {
      return -1;
    }
    if (a[orderBy] < b[orderBy]) {
      return 1;
    }
    return 0;
  };
};

const MatTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState(new Map([]));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ]);

  const handleRequestSort = (event, property) => {
    const orderByTemp = property;
    let orderTemp = 'desc';
    if (orderBy === property && order === 'desc') { orderTemp = 'asc'; }
    setOrder(orderTemp);
    setOrderBy(orderByTemp);
  };

  const handleSelectAllClick = (event, checked) => {
    if (checked) {
      const newSelected = new Map();
      data.map(n => newSelected.set(n.id, true));
      setSelected(newSelected);
      return;
    }
    setSelected(new Map([]));
  };

  const handleClick = (event, id) => {
    const newSelected = new Map(selected);
    const value = newSelected.get(id);
    let isActive = true;
    if (value) {
      isActive = false;
    }
    newSelected.set(id, isActive);
    setSelected(newSelected);
  };

  const handleChangePage = (event, item) => {
    setPage(item);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleDeleteSelected = () => {
    let copyData = [...data];
    for (let i = 0; i < [...selected].filter(el => el[1]).length; i += 1) {
      copyData = copyData.filter(obj => obj.id !== selected[i]);
    }
    setData(copyData);
    setSelected(new Map([]));
  };

  const isSelected = id => !!selected.get(id);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>Material table</CardTitle>
          </CardTitleWrap>
          <MatTableToolbar
            numSelected={[...selected].filter(el => el[1]).length}
            handleDeleteSelected={handleDeleteSelected}
            onRequestSort={handleRequestSort}
          />
          <TableWrap>
            <Table>
              <MatTableHead
                numSelected={[...selected].filter(el => el[1]).length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                  .map((d) => {
                    const select = isSelected(d.id);
                    return (
                      <TableRow
                        role="checkbox"
                        onClick={event => handleClick(event, d.id)}
                        aria-checked={select}
                        tabIndex={-1}
                        key={d.id}
                        selected={select}
                      >
                        <TableCell padding="checkbox">
                          <TableCheckbox checked={select} />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                        >
                          {d.name}
                        </TableCell>
                        <TableCell>
                          {d.calories}
                        </TableCell>
                        <TableCell>
                          {d.fat}
                        </TableCell>
                        <TableCell>
                          {d.carbs}
                        </TableCell>
                        <TableCell>
                          {d.protein}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableWrap>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default MatTable;
