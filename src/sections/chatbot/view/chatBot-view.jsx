import React, { useState } from 'react';
import { Button, Container, Grid, Box } from '@mui/material';
import ChatBotModal from '../ChatBotModal';

const ChatBot = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="inherit" onClick={handleOpenModal}>
            ChatBot
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          overflow: 'hidden', // Masque les barres de défilement verticales
        }}
      >
        <ChatBotModal open={openModal} onClose={handleCloseModal} />
      </Box>
    </Container>
  );
};

export default ChatBot;
