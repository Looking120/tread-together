import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar'; // Importez Scrollbar ici

const icons = {
  'Nouveau Abonné': <Iconify icon="eva:person-add-fill" sx={{ fontSize: 24 }} />,
  'Commentaire': <Iconify icon="eva:message-square-fill" sx={{ fontSize: 24 }} />,
  'Mention': <Iconify icon="eva:at-fill" sx={{ fontSize: 24 }} />,
  'Partage': <Iconify icon="eva:share-fill" sx={{ fontSize: 24 }} />,
  'Message': <Iconify icon="eva:email-fill" sx={{ fontSize: 24 }} />,
};

const containerStyle = {
  maxHeight: 300, 
  overflowY: 'auto', 
};

export default function SubscriberNotifications({ title, subheader, list, ...other }) {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAccept = (notificationId) => {
    console.info('ACCEPTED', notificationId);
    // Ajoutez la logique pour gérer l'acceptation de la notification
  };

  const handleReject = (notificationId) => {
    console.info('REJECTED', notificationId);
    // Ajoutez ici la logique pour gérer le refus de la notification
  };

  const visibleNotifications = showAll ? list : list.slice(0, 3 );

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Scrollbar sx={containerStyle}> {/* Utilisez Scrollbar ici */}
        <Stack spacing={2}>
          {visibleNotifications && visibleNotifications.length > 0 ? (
            visibleNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={handleAccept}
                onReject={handleReject}
                onOpenMenu={handleOpenMenu}
                onCloseMenu={handleCloseMenu}
                open={open}
              />
            ))
          ) : (
            <Typography variant="body2">Aucune notification à afficher</Typography>
          )}

          {list.length > 3 && !showAll && (
            <Button variant="outlined" onClick={() => setShowAll(true)}>
              Voir plus
            </Button>
          )}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

SubscriberNotifications.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

function NotificationItem({ notification, onAccept, onReject, onOpenMenu, onCloseMenu, open }) {
  const isNewSubscriber = notification.title === 'Nouveau Abonné';

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
        }}
      >
        {/* Affichez l'icône correspondant au titre */}
        {icons[notification.title]}

        <div style={{ flexGrow: 1, marginLeft: 8 }}> {/* Ajoutez une marge pour l'espacement */}
          <strong>{notification.title}</strong>
          <p>{notification.message}</p>
        </div>

        {isNewSubscriber && (
          <>
            <Button variant="contained" color="primary" onClick={() => onAccept(notification.id)} sx={{ mr: 1 }}>
              Accepter
            </Button>
            <Button variant="contained" color="secondary" onClick={() => onReject(notification.id)}>
              Refuser
            </Button>
          </>
        )}

        <IconButton color={open ? 'inherit' : 'default'} onClick={onOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={onCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onCloseMenu}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          Détails
        </MenuItem>
      </Popover>
    </>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onOpenMenu: PropTypes.func,
  onCloseMenu: PropTypes.func,
  open: PropTypes.bool,
};
