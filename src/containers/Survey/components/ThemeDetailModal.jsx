// src/containers/Survey/components/ThemeDetailModal.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

// A small component to render color swatches
import PropTypes from 'prop-types';

const ColorSwatch = ({ name, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Box sx={{ width: 24, height: 24, backgroundColor: color, border: '1px solid #ccc', mr: 2 }} />
    <Typography variant="body2">{name}: {color}</Typography>
  </Box>
);

const ThemeDetailModal = ({ open, onClose }) => {
  // Select the 'current' theme and its loading state from Redux
  const { current: theme, loading } = useSelector(state => state.surveyTheme);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Theme Details</DialogTitle>
      <DialogContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && theme && (
          <Box>
            {/* Display General Theme Info */}
            <Typography variant="h6" gutterBottom>{theme.title}</Typography>
            <Typography variant="body1" color="text.secondary">{theme.description}</Typography>
            <Divider sx={{ my: 2 }} />

            {/* Display Theme Settings */}
            <Typography variant="h6" gutterBottom>Settings</Typography>
            {theme.theme_setting ? (
              <List dense>
                {Object.entries(theme.theme_setting.settings).map(([key, value]) => (
                  <ListItem key={key} sx={{ alignItems: 'flex-start' }}>
                    <ListItemText
                      primary={key}
                      secondary={
                        typeof value === 'object' && value !== null ? (
                          <Box component="pre" sx={{ m: 0, p: 0, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                            {JSON.stringify(value, null, 2)}
                          </Box>
                        ) : (
                            String(value)
                        )
                        }
                    />
                  </ListItem>
                ))}
              </List>
            ) : <Typography>No settings found.</Typography>}
            <Divider sx={{ my: 2 }} />

            {/* Display Variable Palettes */}
            <Typography variant="h6" gutterBottom>Color Palettes</Typography>
            {theme.theme_setting?.variable_palettes?.map(palette => (
              <Box
                key={palette.id}
                sx={{
                  mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1">{palette.name}</Typography>
                <ColorSwatch name="Title Color" color={palette.title_color} />
                <ColorSwatch name="Question Color" color={palette.question_color} />
                <ColorSwatch name="Answer Color" color={palette.answer_color} />
                <ColorSwatch name="Primary Accent" color={palette.primary_accent} />
                <ColorSwatch name="Primary Background" color={palette.primary_background} />
                <ColorSwatch name="Secondary Accent" color={palette.secondary_accent} />
                <ColorSwatch name="Secondary Background" color={palette.secondary_background} />
              </Box>
            ))}
          </Box>
        )}
        {!loading && !theme && (
          <Typography>No theme data available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ColorSwatch.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

ThemeDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ThemeDetailModal;
