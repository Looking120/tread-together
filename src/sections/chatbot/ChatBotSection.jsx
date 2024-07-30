import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, TextField, Button, List, ListItem, ListItemAvatar, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const MessageBubble = styled(Box)(({ theme, from }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.5),
  borderRadius: 6,
  maxWidth: '80%',
  color: theme.palette.common.black,
  whiteSpace: 'pre-wrap',
  alignSelf: from === 'user' ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(0.4),
}));

const ChatBotSection = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, from: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
  
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: input,
            max_tokens: 50,
          },
          {
            headers: {
              Authorization: `Bearer sk-proj-4a1bbi8SmmUGG6qlaKArT3BlbkFJy3R06mYawOAsPCmrHchK`, // Utilisez votre clé d'API ici
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.data.choices && response.data.choices.length > 0) {
          const botResponse = {
            text: `Bot: ${response.data.choices[0].text.trim()}`,
            from: 'bot',
          };
  
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        } else {
          console.error('Empty or invalid response from OpenAI');
        }
      } catch (error) {
        console.error('Error querying OpenAI ChatGPT:', error);
      }
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '80vh',
          borderRadius: 3,
          boxShadow: 3,
          overflowY: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f9f9f9', pointerEvents: 'auto' }}>
          <List sx={{ overflowY: 'hidden' }}>
            {messages.map((message, index) => (
              <ListItem key={index} disableGutters>
                <Box sx={{ display: 'flex', justifyContent: message.from === 'user' ? 'flex-end' : 'flex-start', width: '100%' }}>
                  {message.from === 'bot' && (
                    <ListItemAvatar sx={{ alignSelf: 'flex-start', marginRight: 1 }}>
                      <Avatar alt="Bot" src="avatar.jpg" />
                    </ListItemAvatar>
                  )}
                  <MessageBubble from={message.from}>
                    {message.text}
                  </MessageBubble>
                  {message.from === 'user' && (
                    <ListItemAvatar sx={{ alignSelf: 'flex-end', marginLeft: 1 }}>
                      <Avatar alt="User" src="/path/to/user/avatar.jpg" />
                    </ListItemAvatar>
                  )}
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ddd', bgcolor: '#fff' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tapez votre message..."
            sx={{ mr: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Envoyer
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatBotSection;
