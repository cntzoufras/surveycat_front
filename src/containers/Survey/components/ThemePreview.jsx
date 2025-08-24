  import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FONT_OPTIONS } from '@/constants/fontConstants';
import {
  Box, Typography, Paper, Grid, TextField, Button, FormControl,
  InputLabel, Select, MenuItem, Slider, Chip, Switch, FormControlLabel,
} from '@mui/material';
import { ChromePicker } from 'react-color';
import _ from 'lodash';
import tinycolor from 'tinycolor2';

const DEFAULT_THEME = {
  typography: {
    fontFamily: 'Arial, sans-serif',
    // Legacy body size kept for back-compat; new code prefers fontSizePx
    fontSize: '16px',
    fontSizePx: 16,
    // Legacy headingStyle kept for back-compat; new code prefers heading {H1,H2,H3}
    headingStyle: { H1: 'bold 24px', H2: 'normal 18px' },
    heading: {
      H1: { sizePx: 24, weight: 700 },
      H2: { sizePx: 18, weight: 400 },
      H3: { sizePx: 16, weight: 500 },
    },
  },
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    background: '#DE0000',
    text: '#333333',
    // New: separate subtitle color
    subtitle: '#4f4f4f',
    // New: page section title color (used for per-page titles in public survey)
    page_title: '#4f4f4f',
    // New: explicit title color control surfaced in the UI
    title_color: '#333333',
    question: '#090606',
    choice: '#666666',
  },
  variable_palette: { primary_background: '#f1ebf2' },
  layout: { backgroundAlpha: 100, borderRadius: 8, padding: 20, showShadow: true, showBorder: false },
};

const ThemePreview = ({ theme, onThemeUpdate, survey }) => {
  console.log('Variable theme is: ', theme);
  const [activeTab, setActiveTab] = useState('colors');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeColorField, setActiveColorField] = useState(null);
  const [activeColorType, setActiveColorType] = useState('colors'); // 'colors' | 'palette'

  const currentTheme = useMemo(() => _.merge({}, DEFAULT_THEME, theme), [theme]);

  // Dynamically load selected Google font for Live Preview to avoid Roboto fallback
  useEffect(() => {
    const ff = currentTheme?.typography?.fontFamily;
    if (!ff || typeof ff !== 'string') return;
    const families = new Set(FONT_OPTIONS.filter(f => f.google).map(f => f.family));
    const candidates = ff.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    const googleFamily = candidates.find(name => families.has(name));
    if (!googleFamily) return;
    const id = `preview-google-font-${googleFamily.replace(/ /g, '+')}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${googleFamily.replace(/ /g, '+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
    document.head.appendChild(link);
  }, [currentTheme?.typography?.fontFamily]);

  const handleColorChange = (color) => {
    if (!activeColorField) return;

    const newTheme = _.cloneDeep(currentTheme);
    if (activeColorType === 'palette') {
      _.set(newTheme, `variable_palette.${activeColorField}`, color.hex);
    } else {
      _.set(newTheme, `colors.${activeColorField}`, color.hex);
    }

    onThemeUpdate({
      colors: newTheme.colors,
      variable_palette: newTheme.variable_palette,
    });
  };

  const handleTypographyChange = (field, value) => {
    if (field === 'headingStyle') {
      onThemeUpdate({ typography: { ...currentTheme.typography, headingStyle: value } });
    } else {
      onThemeUpdate({ typography: { ...currentTheme.typography, [field]: value } });
    }
  };

  const handleLayoutChange = (field, value) => {
    onThemeUpdate({ layout: { ...currentTheme.layout, [field]: value } });
  };

  const renderPreview = () => {
    const bgAlpha = currentTheme.layout.backgroundAlpha / 100;
    const questionBoxBg = tinycolor(currentTheme.colors.background)
      .setAlpha(bgAlpha)
      .toRgbString();
    const pageBg = currentTheme.variable_palette.primary_background;

    const styles = {
      fontFamily: currentTheme.typography.fontFamily,
      color: currentTheme.colors.text,
      borderRadius: `${currentTheme.layout.borderRadius}px`,
      padding: `${currentTheme.layout.padding}px`,
      backgroundColor: questionBoxBg,
      boxShadow: currentTheme.layout.showShadow ? 2 : 'none',
      border: currentTheme.layout.showBorder ? '1px solid rgba(0,0,0,0.12)' : 'none',
    };

    // Parse heading styles like "bold 24px" into weight + size with sensible fallbacks
    const parseHeadingStyle = (styleStr, defaultSizePx, defaultWeight = 'bold', maxPx) => {
      const str = String(styleStr || '').trim();
      let size = defaultSizePx;
      let weight = defaultWeight;
      if (str) {
        const parts = str.split(/\s+/);
        const sizeToken = parts.find(p => /(\d+)(px|rem|em)$/i.test(p));
        const weightToken = parts.find(p => /^(bold|bolder|lighter|normal|\d{3})$/i.test(p));
        if (sizeToken) {
          // If rem/em provided, keep as-is; else ensure px string
          if (/(rem|em)$/i.test(sizeToken)) size = sizeToken;
          else size = `${parseFloat(sizeToken)}px`;
        }
        if (weightToken) weight = weightToken;
      }
      // Optional max clamp only for preview compactness when px
      if (maxPx && /px$/.test(size)) {
        const n = parseFloat(size);
        size = `${Math.min(n, maxPx)}px`;
      }
      return { size, weight };
    };

    // Resolve heading object values with back-compat from headingStyle strings
    const resolveHeading = (lvl, defPx, defWeight) => {
      const headingObj = currentTheme.typography?.heading?.[lvl];
      if (headingObj && Number.isFinite(headingObj.sizePx) && Number.isFinite(headingObj.weight)) {
        return { sizePx: headingObj.sizePx, weight: headingObj.weight };
      }
      // Fallback to legacy string
      const legacy = currentTheme.typography?.headingStyle?.[lvl];
      const parsed = parseHeadingStyle(legacy, `${defPx}px`, String(defWeight), undefined);
      const sizePx = /px$/.test(parsed.size) ? parseFloat(parsed.size) : defPx;
      const weight = isNaN(parseInt(parsed.weight, 10)) ? (parsed.weight === 'bold' ? 700 : 400) : parseInt(parsed.weight, 10);
      return { sizePx, weight };
    };

    const H1 = resolveHeading('H1', 24, 700);
    const H2 = resolveHeading('H2', 18, 400);
    const H3 = resolveHeading('H3', 16, 500);

    const h1Size = `${H1.sizePx}px`; const h1Weight = H1.weight;
    const h2Size = `${H2.sizePx}px`; const h2Weight = H2.weight;
    const h3Size = `${H3.sizePx}px`; const h3Weight = H3.weight;

    const qSize = (() => {
      const raw = currentTheme.typography.fontSize;
      if (typeof raw === 'number') return `${raw}px`;
      if (Number.isFinite(currentTheme.typography.fontSizePx)) return `${currentTheme.typography.fontSizePx}px`;
      const n = parseFloat(String(raw || '').replace('px', ''));
      return Number.isFinite(n) ? `${n}px` : '16px';
    })();

    // Derive actual titles when available
    const surveyTitle = survey?.title || '';
    const firstPageTitle = (() => {
      const pages = Array.isArray(survey?.survey_pages) ? [...survey.survey_pages] : [];
      if (!pages.length) return '';
      pages.sort((a, b) => (a.sort_index ?? 0) - (b.sort_index ?? 0));
      return pages[0]?.title || '';
    })();

    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          fontFamily: currentTheme.typography.fontFamily,
          color: currentTheme.colors.text,
          borderRadius: `${currentTheme.layout.borderRadius}px`,
          backgroundColor: pageBg,
        }}
      >
        <Box sx={styles}>
        {/* Survey Title - only render actual survey title if provided */}
        {surveyTitle ? (
          <Typography
            variant="h1"
            sx={{
              fontFamily: currentTheme.typography.fontFamily,
              color: currentTheme.colors.title_color || currentTheme.colors.text,
              fontSize: h1Size,
              fontWeight: h1Weight,
              marginBottom: '12px',
            }}
          >
            {surveyTitle}
          </Typography>
        ) : null}

        {/* Subtitle - directly below the survey title, styled as H2 */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: currentTheme.typography.fontFamily,
            color: currentTheme.colors.subtitle || currentTheme.colors.text,
            fontSize: h2Size,
            fontWeight: h2Weight,
            marginBottom: '16px',
            lineHeight: 1.4,
          }}
        >
          Please share your honest feedback about your experience with our service.
          Your response will help us improve our services.
        </Typography>

        {/* Survey Page Title - H3 */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: currentTheme.typography.fontFamily,
            color: currentTheme.colors.page_title || currentTheme.colors.subtitle || currentTheme.colors.title_color || currentTheme.colors.text,
            fontSize: h3Size,
            fontWeight: h3Weight,
            marginBottom: '16px',
          }}
        >
          {firstPageTitle || 'Survey Page Title'}
        </Typography>

        

        {/* Questions Preview - use actual questions if present */}
        {Array.isArray(survey?.survey_pages) && survey.survey_pages.length > 0
          && Array.isArray(survey.survey_pages[0]?.survey_questions)
          && survey.survey_pages[0].survey_questions.length > 0 ? (
          <Box sx={{ mb: 2 }}>
            {survey.survey_pages[0].survey_questions.slice(0, 3).map((q, idx) => (
              <Typography
                key={q.id || idx}
                variant="h6"
                sx={{
                  fontFamily: currentTheme.typography.fontFamily,
                  color: currentTheme.colors.question,
                  fontSize: qSize,
                  fontWeight: 'bold',
                  mb: 1.5,
                }}
              >
                {`${idx + 1}. ${q.title || ''}`}
              </Typography>
            ))}
          </Box>
        ) : (
          <>
            {/* Sample Question Title - H1 Style using question color when no actual questions */}
            <Typography
              variant="h1"
              sx={{
                fontFamily: currentTheme.typography.fontFamily,
                color: currentTheme.colors.question,
                fontSize: qSize,
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              How would you rate our customer service?
            </Typography>
          </>
        )}

        {/* Multiple Choice Options */}
        <Box sx={{ mt: 3, mb: 3 }}>
          {[
            { label: 'Excellent' },
            { label: 'Good' },
            { label: 'Average' },
            { label: 'Poor' },
          ].map(option => (
            <Box
              key={option.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                p: 2,
                border: `1px solid ${currentTheme.colors.choice}`,
                borderRadius: `${currentTheme.layout.borderRadius}px`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: `${currentTheme.colors.primary}10`,
                  borderColor: currentTheme.colors.primary,
                },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${currentTheme.colors.primary}`,
                  borderRadius: '50%',
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <Typography
                sx={{
                  color: currentTheme.colors.choice,
                  fontFamily: currentTheme.typography.fontFamily,
                  fontSize: currentTheme.typography.fontSize || '16px',
                }}
              >
                {option.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: currentTheme.colors.primary,
            color: '#ffffff',
            fontFamily: currentTheme.typography.fontFamily,
            fontSize: currentTheme.typography.fontSize || '16px',
            padding: '12px 24px',
            borderRadius: `${currentTheme.layout.borderRadius}px`,
            textTransform: 'none',
          }}
        >
          Submit Response
        </Button>

        </Box>
      </Paper>
    );
  };

  const renderTypographyEditor = () => {
    const heading = currentTheme.typography.heading || {
      H1: H1,
      H2: H2,
      H3: H3,
    };

    const setHeading = (lvl, key, val) => {
      const newHeading = {
        H1: { ...heading.H1 },
        H2: { ...heading.H2 },
        H3: { ...heading.H3 },
      };
      newHeading[lvl][key] = val;
      onThemeUpdate({
        typography: {
          ...currentTheme.typography,
          heading: newHeading,
        },
      });
    };

    const weightOptions = [100,200,300,400,500,600,700,800,900];

    return (
      <Box>
        <Typography variant="h6" gutterBottom>Typography Settings</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Font Family</InputLabel>
              <Select
                value={currentTheme.typography.fontFamily}
                onChange={e => handleTypographyChange('fontFamily', e.target.value)}
                label="Font Family"
              >
                {FONT_OPTIONS.map(opt => (
                  <MenuItem key={opt.label} value={opt.stack} sx={{ fontFamily: opt.stack }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Body Font Size (px)"
              value={Number.isFinite(currentTheme.typography.fontSizePx) ? currentTheme.typography.fontSizePx : parseFloat(String(currentTheme.typography.fontSize || '16').replace('px',''))}
              onChange={e => handleTypographyChange('fontSizePx', parseInt(e.target.value || '0', 10) || 0)}
            />
          </Grid>

          {/* H1 Controls */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="H1 Size (px)"
              value={heading.H1.sizePx}
              onChange={e => setHeading('H1', 'sizePx', parseInt(e.target.value || '0', 10) || 0)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>H1 Weight</InputLabel>
              <Select label="H1 Weight" value={heading.H1.weight} onChange={e => setHeading('H1', 'weight', parseInt(e.target.value, 10))}>
                {weightOptions.map(w => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* H2 Controls */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="H2 Size (px)"
              value={heading.H2.sizePx}
              onChange={e => setHeading('H2', 'sizePx', parseInt(e.target.value || '0', 10) || 0)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>H2 Weight</InputLabel>
              <Select label="H2 Weight" value={heading.H2.weight} onChange={e => setHeading('H2', 'weight', parseInt(e.target.value, 10))}>
                {weightOptions.map(w => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* H3 Controls (for Survey Page Title) */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="H3 Size (px)"
              value={heading.H3.sizePx}
              onChange={e => setHeading('H3', 'sizePx', parseInt(e.target.value || '0', 10) || 0)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>H3 Weight</InputLabel>
              <Select label="H3 Weight" value={heading.H3.weight} onChange={e => setHeading('H3', 'weight', parseInt(e.target.value, 10))}>
                {weightOptions.map(w => (
                  <MenuItem key={w} value={w}>{w}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderColorEditor = () => {
    const pickerColor = activeColorType === 'palette'
        ? currentTheme.variable_palette[activeColorField]
        : currentTheme.colors[activeColorField];

    return (
      <Box>
        <Typography variant="h6" gutterBottom>Color Settings</Typography>

        <Grid container spacing={3}>
          {/* Page Background from variable_palette */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Page Background
              </Typography>
              <Chip
                label={currentTheme.variable_palette.primary_background}
                sx={{
                  backgroundColor: currentTheme.variable_palette.primary_background,
                  color: tinycolor(currentTheme.variable_palette.primary_background).isDark()
                    ? '#fff'
                    : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveColorField('primary_background');
                  setActiveColorType('palette');
                  setColorPickerOpen(true);
                }}
              />
            </Box>
          </Grid>

          {/* Question Box Background from colors.background */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Question Box
              </Typography>
              <Chip
                label={currentTheme.colors.background}
                sx={{
                  backgroundColor: currentTheme.colors.background,
                  color: tinycolor(currentTheme.colors.background).isDark() ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveColorField('background');
                  setActiveColorType('colors');
                  setColorPickerOpen(true);
                }}
              />
            </Box>
          </Grid>

          {/* Other colors */}
          {(() => {
            const labelMap = {
              page_title: 'Page Title',
              title_color: 'Title',
              subtitle: 'Subtitle',
              text: 'Text',
              question: 'Question',
              choice: 'Choice',
              primary: 'Primary',
              secondary: 'Secondary',
            };
            const order = ['page_title', 'title_color', 'subtitle', 'text', 'primary', 'secondary', 'question', 'choice'];
            const entries = Object.entries(currentTheme.colors)
              .filter(([key]) => key !== 'background')
              .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));
            return entries.map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ minWidth: 80 }}>
                    {labelMap[key] || (key.charAt(0).toUpperCase() + key.slice(1))}
                  </Typography>
                  <Chip
                    label={value}
                    sx={{
                      backgroundColor: value,
                      color: value === '#ffffff' ? '#000000' : '#ffffff',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setActiveColorField(key);
                      setActiveColorType('colors');
                      setColorPickerOpen(true);
                    }}
                  />
                </Box>
              </Grid>
            ));
          })()}
        </Grid>

        {colorPickerOpen && activeColorField && (
          <Box sx={{ mt: 2 }}>
            <ChromePicker
              color={pickerColor}
              onChange={handleColorChange}
              onChangeComplete={handleColorChange}
            />
            <Button onClick={() => setColorPickerOpen(false)} sx={{ mt: 1 }}>
              Close
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  const renderLayoutEditor = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Layout Settings</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={(
              <Switch
                checked={Boolean(currentTheme.layout.showShadow)}
                onChange={(e) => handleLayoutChange('showShadow', e.target.checked)}
              />
            )}
            label="Show Shadow"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={(
              <Switch
                checked={Boolean(currentTheme.layout.showBorder)}
                onChange={(e) => handleLayoutChange('showBorder', e.target.checked)}
              />
            )}
            label="Show Border"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Background Alpha</Typography>
          <Slider
            value={currentTheme.layout.backgroundAlpha}
            onChange={(event, value) => handleLayoutChange('backgroundAlpha', value)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Border Radius"
            type="number"
            value={currentTheme.layout.borderRadius}
            onChange={e => handleLayoutChange('borderRadius', parseInt(e.target.value, 10))}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Padding"
            type="number"
            value={currentTheme.layout.padding}
            onChange={e => handleLayoutChange('padding', parseInt(e.target.value, 10))}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const pageBg = currentTheme.variable_palette.primary_background
    || DEFAULT_THEME.variable_palette.primary_background;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Theme Customization</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Button
                onClick={() => setActiveTab('typography')}
                variant={activeTab === 'typography' ? 'contained' : 'text'}
                sx={{ mr: 1 }}
              >
                Typography
              </Button>
              <Button
                onClick={() => setActiveTab('colors')}
                variant={activeTab === 'colors' ? 'contained' : 'text'}
                sx={{ mr: 1 }}
              >
                Colors
              </Button>
              <Button
                onClick={() => setActiveTab('layout')}
                variant={activeTab === 'layout' ? 'contained' : 'text'}
              >
                Layout
              </Button>
            </Box>

            {activeTab === 'typography' && renderTypographyEditor()}
            {activeTab === 'colors' && renderColorEditor()}
            {activeTab === 'layout' && renderLayoutEditor()}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Page background */}
          <Paper elevation={1} sx={{ p: 3, backgroundColor: pageBg }}>
            <Typography variant="h6" gutterBottom>Live Preview</Typography>
            {renderPreview()}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

ThemePreview.propTypes = {
  theme: PropTypes.shape({
    typography: PropTypes.shape({
      fontFamily: PropTypes.string,
      fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      headingStyle: PropTypes.shape({
        H1: PropTypes.string,
        H2: PropTypes.string,
      }),
    }),
    colors: PropTypes.objectOf(PropTypes.string),
    variable_palette: PropTypes.objectOf(PropTypes.string),
    layout: PropTypes.shape({
      backgroundAlpha: PropTypes.number,
      borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }),
  onThemeUpdate: PropTypes.func.isRequired,
  survey: PropTypes.shape({
    title: PropTypes.string,
    survey_pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      sort_index: PropTypes.number,
    })),
  }),
};

ThemePreview.defaultProps = {
  theme: DEFAULT_THEME,
  survey: null,
};

export default ThemePreview;
