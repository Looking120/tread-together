import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import ChatBotSection from './ChatBotSection'; // Assurez-vous que le chemin est correct
import CloseIcon from '@mui/icons-material/Close';

const ChatBotModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { overflow: 'hidden' } }}>
      <DialogTitle>
        <Typography variant="h6" component="div">
          ChatBot
        </Typography>
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'hidden' }}>
        <ChatBotSection /> {/* Assurez-vous que l'utilisation du composant est correcte ici */}
      </DialogContent>
    </Dialog>
  );
};

export default ChatBotModal;
