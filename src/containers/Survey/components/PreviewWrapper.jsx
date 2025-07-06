import React from 'react';
import PropTypes from 'prop-types';

import {
  ThemeProvider as MuiThemeProvider,
  useTheme,
  createTheme,
} from '@mui/material/styles';
// Adjusted path: PublicSurveyPreview is in the same directory
import PublicSurveyPreview from './PublicSurveyPreview';

function PreviewWrapper({ pageData, selectedPalette, onSubmit }) {
  // 1. grab the app’s primary theme
  const baseTheme = useTheme();

  // 2. build a preview theme by deep-merging overrides
  const previewTheme = createTheme(baseTheme, {
    palette: {
      primary: { main: selectedPalette.primary_accent },
      secondary: { main: selectedPalette.secondary_accent },
      background: {
        default: selectedPalette.primary_background,
        paper: selectedPalette.secondary_background,
      },
      text: {
        primary: selectedPalette.title_color,
        secondary: selectedPalette.question_color,
      },
    },
    typography: {
      fontFamily: pageData.theme.theme_setting.settings.typography?.fontFamily,
      fontSize: parseInt(
        pageData.theme.theme_setting.settings.typography?.fontSize,
        10,
      ),
    },
  });

  // 3. wrap just the preview in the nested provider
  return (
    <MuiThemeProvider theme={previewTheme}>
      <PublicSurveyPreview
        survey={{ title: pageData.page_title, description: pageData.description }}
        questions={pageData.questions}
        themeSettings={pageData.theme.theme_setting.settings}
        onSubmit={onSubmit}
      />
    </MuiThemeProvider>
  );
}

PreviewWrapper.propTypes = {
  pageData: PropTypes.shape({
    page_title: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
        // Replace these with the actual properties of your question object
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        question_text: PropTypes.string,
        type: PropTypes.string,
        // If a question can have options, you could even nest shapes:
        // options: PropTypes.arrayOf(PropTypes.shape({
        //   id: PropTypes.string.isRequired,
        //   label: PropTypes.string,
        // })),
      })).isRequired,
    theme: PropTypes.shape({
      theme_setting: PropTypes.shape({
        settings: PropTypes.shape({
          typography: PropTypes.shape({
            fontFamily: PropTypes.string,
            fontSize: PropTypes.string,
          }),
          show_page_title: PropTypes.bool,
          show_progress_bar: PropTypes.bool,
          show_question_numbers: PropTypes.bool,
        }).isRequired,
      }).isRequired,
      variable_palettes: PropTypes.arrayOf(
        PropTypes.shape({
          title_color: PropTypes.string,
          question_color: PropTypes.string,
          answer_color: PropTypes.string,
          primary_accent: PropTypes.string,
          primary_background: PropTypes.string,
          secondary_accent: PropTypes.string,
          secondary_background: PropTypes.string,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  selectedPalette: PropTypes.shape({
    primary_accent: PropTypes.string.isRequired,
    secondary_accent: PropTypes.string.isRequired,
    primary_background: PropTypes.string.isRequired,
    secondary_background: PropTypes.string.isRequired,
    title_color: PropTypes.string.isRequired,
    question_color: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func,
};

PreviewWrapper.defaultProps = {
  onSubmit: () => {},
};

export default PreviewWrapper;
