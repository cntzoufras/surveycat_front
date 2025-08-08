import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThemesAction, fetchThemeAction } from '@/redux/actions/surveyThemeActions';

// Material-UI Components
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import Loading from '@/shared/components/Loading';
import AddIcon from '@mui/icons-material/Add';
import ThemeDetailModal from './ThemeDetailModal';

const SurveyThemeList = () => {
  const dispatch = useDispatch();
  const { list: themes, loading, error } = useSelector(state => state.surveyTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch themes when the component mounts
  useEffect(() => {
    dispatch(fetchThemesAction());
  }, [dispatch]);

  const handleViewDetails = (themeId) => {
    dispatch(fetchThemeAction(themeId));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Survey Themes
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load themes: {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Box sx={{ maxWidth: 360, width: '100%' }}>
            <Loading loading fullScreen={false} label="Loading" minHeight={120} />
          </Box>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {themes.map(theme => (
            <Grid item key={theme.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {theme.title}
                  </Typography>
                  <Typography>
                    {theme.description || 'No description available.'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleViewDetails(theme.id)}>View/Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <ThemeDetailModal open={isModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default SurveyThemeList;
