// Mock alias-based API module so imports in actions don't break under Jest
jest.mock('@/utils/api/survey-api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}), { virtual: true });

import reducer from '../surveySubmissionsReducer';
import {
  FETCH_SUBMISSIONS_REQUEST,
  FETCH_SUBMISSIONS_SUCCESS,
  FETCH_SUBMISSIONS_FAILURE,
  FETCH_SURVEY_SUBMISSION_REQUEST,
  FETCH_SURVEY_SUBMISSION_SUCCESS,
  FETCH_SURVEY_SUBMISSION_FAILURE,
  CLEAR_SURVEY_SUBMISSION_DETAILS,
} from '../../actions/surveySubmissionsActions';

describe('surveySubmissionsReducer', () => {
  const initialState = {
    survey_submissions: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    nextPage: null,
    prevPage: null,
    perPage: 10,
    selectedSubmission: null,
    loadingDetails: false,
    errorDetails: null,
  };

  it('should return the initial state when state is undefined', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_SUBMISSIONS_REQUEST and set perPage from meta', () => {
    const action = { type: FETCH_SUBMISSIONS_REQUEST, meta: { perPage: 20 } };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.perPage).toBe(20);
    expect(state.error).toBeNull();
  });

  it('should handle FETCH_SUBMISSIONS_SUCCESS and preserve perPage', () => {
    const prev = { ...initialState, loading: true, perPage: 20 };
    const payload = {
      data: [{ id: 1 }, { id: 2 }],
      current_page: 2,
      last_page: 5,
      total: 42,
      next_page_url: '/survey-submissions?page=3',
      prev_page_url: '/survey-submissions?page=1',
    };
    const action = { type: FETCH_SUBMISSIONS_SUCCESS, payload };
    const state = reducer(prev, action);
    expect(state.loading).toBe(false);
    expect(state.survey_submissions).toEqual(payload.data);
    expect(state.currentPage).toBe(2);
    expect(state.totalPages).toBe(5);
    expect(state.totalCount).toBe(42);
    expect(state.nextPage).toBe(payload.next_page_url);
    expect(state.prevPage).toBe(payload.prev_page_url);
    // critical: do not override perPage from backend
    expect(state.perPage).toBe(20);
  });

  it('should handle FETCH_SUBMISSIONS_FAILURE', () => {
    const prev = { ...initialState, loading: true };
    const action = { type: FETCH_SUBMISSIONS_FAILURE, payload: 'Error' };
    const state = reducer(prev, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle FETCH_SURVEY_SUBMISSION_REQUEST', () => {
    const action = { type: FETCH_SURVEY_SUBMISSION_REQUEST };
    const state = reducer(initialState, action);
    expect(state.loadingDetails).toBe(true);
    expect(state.errorDetails).toBeNull();
  });

  it('should handle FETCH_SURVEY_SUBMISSION_SUCCESS', () => {
    const prev = { ...initialState, loadingDetails: true };
    const action = { type: FETCH_SURVEY_SUBMISSION_SUCCESS, payload: { id: 123 } };
    const state = reducer(prev, action);
    expect(state.loadingDetails).toBe(false);
    expect(state.selectedSubmission).toEqual({ id: 123 });
  });

  it('should handle FETCH_SURVEY_SUBMISSION_FAILURE', () => {
    const prev = { ...initialState, loadingDetails: true };
    const action = { type: FETCH_SURVEY_SUBMISSION_FAILURE, payload: 'Details error' };
    const state = reducer(prev, action);
    expect(state.loadingDetails).toBe(false);
    expect(state.errorDetails).toBe('Details error');
  });

  it('should handle CLEAR_SURVEY_SUBMISSION_DETAILS', () => {
    const prev = { ...initialState, selectedSubmission: { id: 1 }, loadingDetails: true, errorDetails: 'x' };
    const action = { type: CLEAR_SURVEY_SUBMISSION_DETAILS };
    const state = reducer(prev, action);
    expect(state.selectedSubmission).toBeNull();
    expect(state.loadingDetails).toBe(false);
    expect(state.errorDetails).toBeNull();
  });
});
