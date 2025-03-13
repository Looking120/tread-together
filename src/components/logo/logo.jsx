import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import RouterLink from '../../routes/components/router-link'; 
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {


  // Utilisation d'une image PNG locale depuis le dossier public
  const logo = (
    <Box
      component="img"
      src="logo.png" 
      alt="Logo" 
      sx={{
        width: 200, 
        height: 100, 
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/app" underline="none" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
