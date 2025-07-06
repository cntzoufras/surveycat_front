// components/PublicSurveyPreview.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Box, Typography, Button,
} from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import PublicQuestionList from './public/PublicQuestionList';

export default function PublicSurveyPreview({
  survey,
  questions,
  themeSettings,
  palette,
  onSubmit,
}) {
  // build a MUI theme override from your themeSettings + palette
  const muiTheme = createTheme({
    palette: {
      primary: { main: palette.primary_accent },
      secondary: { main: palette.secondary_accent },
      background: {
        default: palette.primary_background,
        paper: palette.secondary_background,
      },
      text: {
        primary: palette.title_color,
        secondary: palette.question_color,
      },
    },
    typography: {
      fontFamily: themeSettings.typography?.fontFamily,
      fontSize: parseInt(themeSettings.typography?.fontSize, 10),
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          {themeSettings.show_page_title && (
            <Typography variant="h4" component="h1" gutterBottom>
              {survey.title}
            </Typography>
          )}
        </Box>

        <PublicQuestionList
          questions={questions}
          showNumbers={themeSettings.show_question_numbers}
          onResponseChange={() => {}}
        />

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" onClick={onSubmit}>
            Preview Submit
          </Button>
        </Box>
      </Container>
    </MuiThemeProvider>
  );
}

PublicSurveyPreview.propTypes = {
  survey: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  themeSettings: PropTypes.shape({
    typography: PropTypes.shape({
      fontFamily: PropTypes.string,
      fontSize: PropTypes.string,
    }),
    show_page_title: PropTypes.bool,
    show_progress_bar: PropTypes.bool,
    show_question_numbers: PropTypes.bool,
  }).isRequired,
  palette: PropTypes.shape({
    title_color: PropTypes.string.isRequired,
    question_color: PropTypes.string.isRequired,
    answer_color: PropTypes.string,
    primary_accent: PropTypes.string.isRequired,
    primary_background: PropTypes.string.isRequired,
    secondary_accent: PropTypes.string.isRequired,
    secondary_background: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func,
};

PublicSurveyPreview.defaultProps = {
  onSubmit: () => {},
};
