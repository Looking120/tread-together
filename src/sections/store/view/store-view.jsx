import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { posts } from '../../../_mock/blog';

import Iconify from '../../../components/iconify';

import StoreCard from '../store-card';
import StoreSort from '../store-sort';
import StoreSearch from '../store-search';

// ----------------------------------------------------------------------

export default function StoreView() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Store</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Store
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <StoreSearch posts={posts} />
        <StoreSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <StoreCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
