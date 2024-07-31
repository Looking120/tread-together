import { useState } from 'react';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { follow } from '../../_mock/follow';
import Scrollbar from '../../components/scrollbar';
import { applyFilter, getComparator } from './utils';
import FollowTableToolbar from '../follow-table-toolbar';
import FollowNoData from '../follow-no-data';

export default function FollowView (){

    const [filterName, setFilterName] = useState ('');
    const [following, setFollowing] = useState(follow.map(user => ({ ...user, isFollowing: false })));

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const handleFollowToggle = (id) => {
        setFollowing(prev =>
            prev.map(user =>
                user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
            )
        );
    };

    const dataFiltered = applyFilter ({
        filterName,
        inputData: following,
        comparator: getComparator('asc', 'name'),
    });

    const notfound = !dataFiltered.length && !!filterName;

    return(
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
                <FollowTableToolbar 
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>             
                        {dataFiltered.map((user) =>(
                            <Card
                            variant="outlined"
                            sx={{
                                padding: 1,
                                display:"flex",
                                alignItems: "center",
                                width: '100%',
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

                                <Button
                                    variant="contained"
                                    color={user.isFollowing ? "secondary" : "primary"}
                                    sx={{ marginRight: 2 }}
                                    onClick={() => handleFollowToggle(user.id)}
                                >
                                    {user.isFollowing ? "Ne pas suivre" : "Suivre"}
                                </Button>
                            </Card>
                        ))}
                    </Box>
                </Scrollbar>

                {notfound && <FollowNoData query={filterName} />}
            </Box>
        </Container>
    );
}
