const initialState = {
  questions: [],  // This will hold the list of questions
  choices: [],    // This will hold the list of choices
  loading: false, // Flag to indicate loading state
  error: null,    // To capture any errors
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
