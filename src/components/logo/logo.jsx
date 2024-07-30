import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import RouterLink from '../../routes/components/router-link'; // Assurez-vous que le chemin d'importation de RouterLink est correct

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {


  // Utilisation d'une image PNG locale depuis le dossier public
  const logo = (
    <Box
      component="img"
      src="logo.png" // Assurez-vous que le chemin d'accès à votre logo est correct
      alt="Logo" // Assurez-vous d'ajouter un attribut alt pour l'accessibilité
      sx={{
        width: 50, // Ajustez la largeur selon vos besoins
        height: 50, // Ajustez la hauteur selon vos besoins
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
    <Link component={RouterLink} to="/" underline="none" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
