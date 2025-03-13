import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { signOut } from '../../../utils/authUtils'; // Importer la fonction de déconnexion

// Options du menu
const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  // Récupérer les informations de l'utilisateur depuis le localStorage
  const userString = localStorage.getItem('user');
  const user = userString && userString !== 'undefined' ? JSON.parse(userString) : null; // Vérifier si userString est valide

  // Ouvrir le popover
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // Fermer le popover
  const handleClose = () => {
    setOpen(null);
  };

  // Gérer la déconnexion
  const handleLogout = async () => {
    try {
      await signOut(); // Appeler la fonction de déconnexion
      handleClose(); // Fermer le popover
      navigate('/login'); // Rediriger vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      navigate('/login'); // Rediriger en cas d'erreur
    }
  };

  return (
    <>
      {/* Bouton pour ouvrir le popover */}
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL || '/default-avatar.png'} // Utiliser la photo de l'utilisateur ou une photo par défaut
          alt={user?.userName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.userName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {/* Popover */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {/* Informations de l'utilisateur */}
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.userName || 'Invité'} {/* Afficher "Invité" si l'utilisateur n'est pas connecté */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || 'Non connecté'} {/* Afficher "Non connecté" si l'utilisateur n'est pas connecté */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Options du menu */}
        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        {/* Option de déconnexion */}
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}