import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Form } from 'react-bootstrap';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronDoubleRightIcon from 'mdi-react/ChevronDoubleRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronDoubleLeftIcon from 'mdi-react/ChevronDoubleLeftIcon';
import styled from 'styled-components';
import {
  colorSelection,
  colorAdditional,
  colorBackground,
  colorFieldsBorder,
  colorIcon,
  colorText,
} from '@/utils/palette';
import {
  marginRight,
  marginLeft,
} from '@/utils/directions';

const ReactTablePagination = ({
  dataLength,
  page,
  gotoPage,
  canPreviousPage,
  pageOptions,
  pageSize,
  pageIndex,
  previousPage,
  nextPage,
  canNextPage,
  setPageSize,
  manualPageSize,
  disabled,
  totalLabel,
}) => {
  const arrayPageIndex = (pageIndex - 2) < 0
    ? pageOptions.slice(0, pageIndex + 3)
    : pageOptions.slice((pageIndex - 2), (pageIndex + 3));

  return (
    <PaginationWrap>
      <Pagination>
        <Pagination.First
          disabled={disabled || !canPreviousPage}
          className="pagination__item--arrow"
          onClick={() => gotoPage(0)}
        >
          <ChevronDoubleLeftIcon />
        </Pagination.First>
        <Pagination.Prev
          disabled={disabled || !canPreviousPage}
          className="pagination__item--arrow"
          onClick={previousPage}
        >
          <ChevronLeftIcon />
        </Pagination.Prev>
        {arrayPageIndex.map(i => (
          <Pagination.Item
            key={i}
            active={pageIndex === i}
            onClick={() => !disabled && gotoPage(i)}
            disabled={disabled}
          >
            {i + 1}
          </Pagination.Item>
         ))}
        <Pagination.Next
          disabled={disabled || !canNextPage}
          className="pagination__item--arrow"
          onClick={nextPage}
        >
          <ChevronRightIcon />
        </Pagination.Next>
        <Pagination.Last
          disabled={disabled || !canNextPage}
          className="pagination__item--arrow"
          onClick={() => gotoPage(pageOptions.length - 1)}
        >
          <ChevronDoubleRightIcon />
        </Pagination.Last>
      </Pagination>
      <PaginationInfo>
        Showing {pageSize * pageIndex + 1} to {pageSize * pageIndex + page.length} of {dataLength} {totalLabel}
      </PaginationInfo>
      {manualPageSize.length > 1 && (
        <PaginationSelectWrap as={Form.Group}>
          <PaginationFormSelect
            name="select"
            id="exampleSelect"
            value={pageSize}
            disabled={disabled}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
            }}
          >
            {manualPageSize.map(item => (
              <PaginationFormOption key={item} value={item}>
                Show {item}
              </PaginationFormOption>
            ))}
          </PaginationFormSelect>
        </PaginationSelectWrap>
      )}
    </PaginationWrap>
  );
};

ReactTablePagination.propTypes = {
  dataLength: PropTypes.number.isRequired,
  page: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  gotoPage: PropTypes.func.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  pageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  manualPageSize: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  totalLabel: PropTypes.string,
};

ReactTablePagination.defaultProps = {
  manualPageSize: [10, 20, 30, 40],
  disabled: false,
  totalLabel: '',
};

export default ReactTablePagination;

// region STYLES

export const PaginationWrap = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    
    & > * {
      margin: 10px 0;
    }
  }

  .page-item {
    ${marginRight}: 2px;

    .page-link {
      background: transparent;
      border: none;
      color: ${colorAdditional};
      height: 28px;
      font-size: 10px;
      padding: 5px;
      text-align: center;
      min-width: 28px;
      transition: all 0.3s;

      &:hover {
        color: ${colorSelection};
        background: transparent;
      }

      &:focus, &:active {
        box-shadow: none;
      }

      svg {
        width: 13px;
        height: 13px;
        fill: ${colorAdditional};
        transition: 0.3s;
        position: absolute;
        top: 7px;
        left: 8px;
      }
    }

    &.pagination__item--arrow .page-link {
      border-radius: 50%;
      width: 28px;
      height: 28px;
      background: ${colorFieldsBorder};

      &:hover {
        background: ${colorSelection};

        svg {
          fill: white;
        }
      }
    }

    &.pagination__item--arrow.disabled .page-link {
      cursor: default;
      opacity: 0.4;
      background: ${colorFieldsBorder};

      svg {
        fill: ${colorAdditional};
      }
    }

    &.active .page-link {
      background-color: transparent;
      font-weight: bold;
      color: ${colorText};
    }

    &.disabled .page-link svg {
      fill: ${colorIcon};
    }
  }
`;

const PaginationInfo = styled.div`
  color: ${colorAdditional};
  font-size: 12px;
  ${marginRight}: 0;
  ${marginLeft}: 10px;
`;

const PaginationSelectWrap = styled(PaginationInfo)`
  ${marginLeft}: 20px;
  color: ${colorAdditional};
`;

const PaginationFormSelect = styled(Form.Select)`
  color: ${colorAdditional};
  font-size: 12px;
  background-color: ${colorBackground};
  padding: 6px 12px;
  appearance: auto;
  background-image: none;
`;

const PaginationFormOption = styled.option`
  color: ${colorAdditional};
  font-size: 14px;
`;

// endregion
