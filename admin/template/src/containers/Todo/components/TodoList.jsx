import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SimpleLoader from '@/shared/components/SimpleLoader';
import { left } from '@/utils/directions';
import TodoItem from './TodoItem';
import todoCard from '../types';

const TodoList = ({
  todoElements,
  changeShowEditModal,
  editTodoElementAction,
  deleteTodoElementAction,
  isCompleted,
}) => (
  <Fragment>
    {todoElements && todoElements.length > 0 && (
      todoElements.map(todo => (
        <div key={todo.data.id}>
          <TodoItem
            todoItemData={todo}
            changeShowEditModal={changeShowEditModal}
            editTodoElement={editTodoElementAction}
            deleteTodoElement={deleteTodoElementAction}
            isCompleted={isCompleted}
          />
        </div>
      ))
    )}
  </Fragment>
);

TodoList.propTypes = {
  todoElements: PropTypes.arrayOf(todoCard),
  changeShowEditModal: PropTypes.func.isRequired,
  editTodoElementAction: PropTypes.func.isRequired,
  deleteTodoElementAction: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

TodoList.defaultProps = {
  todoElements: null,
};

const TodoListWrapper = ({
  todoElements,
  changeShowEditModal, editTodoElementAction, deleteTodoElementAction,
  isFetching, isCompleted, isArchived,
}) => (
  <Fragment>
    {isFetching ? (
      <TodoPanelRefresh>
        <SimpleLoader />
      </TodoPanelRefresh>
    ) : (
      <TodoList
        todoElements={todoElements}
        changeShowEditModal={changeShowEditModal}
        editTodoElementAction={editTodoElementAction}
        deleteTodoElementAction={deleteTodoElementAction}
        isCompleted={isCompleted}
        isArchived={isArchived}
      />
    )}
  </Fragment>
);

TodoListWrapper.propTypes = {
  todoElements: PropTypes.arrayOf(todoCard),
  changeShowEditModal: PropTypes.func,
  editTodoElementAction: PropTypes.func,
  deleteTodoElementAction: PropTypes.func,
  isFetching: PropTypes.bool,
  isCompleted: PropTypes.bool,
  isArchived: PropTypes.bool,
};

TodoListWrapper.defaultProps = {
  todoElements: [],
  deleteTodoElementAction: () => {},
  changeShowEditModal: () => {},
  editTodoElementAction: () => {},
  isFetching: false,
  isCompleted: false,
  isArchived: false,
};

export default TodoListWrapper;

// region STYLES

export const TodoPanelRefresh = styled.div`
  max-width: 100%;
  height: 100%;
  max-height: 80px;
  text-align: center;
  ${left}: 0;

  svg {
    ${left}: calc(50% - 24px);
  }
`;

// endregion
