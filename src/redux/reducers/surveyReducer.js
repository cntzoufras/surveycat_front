const initialState = {
  questions: [],
  choices: [],
  loading: false,
  error: null,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SURVEY_QUESTION_SUCCESS':
      return {
        ...state,
        questions: [...state.questions, action.payload],
        loading: false,
      };
    case 'CREATE_SURVEY_QUESTION_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CREATE_SURVEY_QUESTION_CHOICES_SUCCESS':
      return {
        ...state,
        choices: [...state.choices, ...action.payload],
        loading: false,
      };
    case 'CREATE_SURVEY_QUESTION_CHOICES_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default surveyReducer;
