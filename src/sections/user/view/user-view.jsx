import { useState } from 'react';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { users } from '../../../_mock/user';
import Scrollbar from '../../../components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableToolbar from '../user-table-toolbar';
import { applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [filterName, setFilterName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClick = (event, user) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuOption = (option) => {
    console.log(`${option} for ${selectedUser.name}`);
    handleCloseMenu();
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator('asc', 'name'),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>

      <Box sx={{
      margin: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 900,
      right: '10rem',
      gap: 4,
      position: 'relative',
      transform: 'translateX(10rem)'
      }}>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        
        <Scrollbar>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {dataFiltered.map((user) => (
              <Card 
                variant="outlined" 
                sx={{ 
                  padding: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  minWidth: '100%', // Ensure it takes full width of the container
                  flexShrink: 0
                }} 
                key={user.id}
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ marginBottom: 0.5 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 0.5 }}>
                    {user.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.company}
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                  Message
                </Button>
                <IconButton onClick={(event) => handleClick(event, user)}>
                  <MoreVertIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        </Scrollbar>

        {notFound && <TableNoData query={filterName} />}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => handleMenuOption('Unfollow')}>Unfollow</MenuItem>
          <MenuItem onClick={() => handleMenuOption('Manage Notifications')}>Manage Notifications</MenuItem>
          <MenuItem onClick={() => handleMenuOption('See Shared Activity')}>See Shared Activity</MenuItem>
          <MenuItem onClick={() => handleMenuOption('Mute')}>Mute</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}
