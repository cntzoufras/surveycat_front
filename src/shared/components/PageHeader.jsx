import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';

const PageHeader = ({
  title,
  subtitle,
  actions,
  mb = 3,
  variant = 'h4',
  subtitleVariant = 'subtitle1',
  fontWeight = 'normal',
}) => {
  return (
    <Box sx={{ mb }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box>
          {title && (
            <Typography variant={variant} component="h1" sx={{ fontWeight }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant={subtitleVariant} color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
      </Stack>
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actions: PropTypes.node,
  mb: PropTypes.number,
  variant: PropTypes.string,
  subtitleVariant: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PageHeader;
