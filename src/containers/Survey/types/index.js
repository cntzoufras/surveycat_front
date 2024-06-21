import {
  shape, string, bool,
} from 'prop-types';

const surveyCard = shape({
  data: shape({
    id: string.isRequired,
    title: string.isRequired,
    description: string,
    survey_category_id: string,
    survey_status_id: string,
    user_id: string,
    theme_id: string,
    priority: string.isRequired,
    isCompleted: bool.isRequired,
    isArchived: bool.isRequired,
  }),
  isFetching: bool.isRequired,
  error: shape(),
});

export default surveyCard;
