import { useState } from 'react';
import FilterMenu from './FilterMenu';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import CreateListingPage from './CreateListingPage';
import ListingCard from '../components/ListingCard';
import { useGetListingsQuery } from '../services/listing';
import { useGetMySessionQuery } from '../services/session';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function ListingsPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sort, setSort] = useState('-created_at');

    const [open, setOpen] = useState(false);

    const mySessionQuery = useGetMySessionQuery({}, {
        refetchOnMountOrArgChange: true
    });

    const listingsQuery = useGetListingsQuery({
        params: { sort }
    }, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <Box sx={{ height: '100%' }}>
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar>
                    <Typography variant="h5"> Listings </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant='outlined' onClick={(event) => setAnchorEl(event.currentTarget)}> Filter </Button>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <FilterMenu />
                        </Popover>
                        <FormControl sx={{ ml: 1 }}>
                            <InputLabel id="sort-by"> Sort By </InputLabel>
                            <Select
                                labelId="sort-by"
                                label="Sort By"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <MenuItem value='-price'> Price: Descending </MenuItem>
                                <MenuItem value='price'> Price: Ascending </MenuItem>
                                <MenuItem value='-created_at'> Date Listed: Newest First </MenuItem>
                                <MenuItem value='created_at'> Date Listed: Oldest First </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    { mySessionQuery.data && <Button sx={{ justifySelf: 'end' }} onClick={() => setOpen(true)} variant='contained'> Create Listing </Button> }
                </Box>

                { open && <CreateListingPage open={open} handleClose={() => setOpen(false)} /> }
                <Grid container spacing={2}>
                    { 
                        listingsQuery.data && listingsQuery.data.map(listing => 
                            <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
                                <ListingCard listing={listing} />
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        </Box>
    )
}

export default ListingsPage;