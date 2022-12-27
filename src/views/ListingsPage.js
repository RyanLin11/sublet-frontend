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
import { TextField } from '@mui/material';

function ListingsPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sort, setSort] = useState('-created_at');
    const [campus, setCampus] = useState('University of Waterloo');

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
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth >
                            <InputLabel id='select-campus-label'> Campus </InputLabel>
                            <Select
                                labelId='select-campus-label'
                                id='select-campus'
                                label='Campus'
                                value={campus}
                                onChange={(e) => setCampus(e.target.value)}
                            >
                                <MenuItem value='University of Waterloo'> University of Waterloo </MenuItem>
                                <MenuItem value='Wilfrid Laurier University'> Wilfrid Laurier University </MenuItem>
                                <MenuItem value='Conestoga College'> Conestoga College </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            type='date'
                            name='move_in_date'
                            label='Start Date'
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            type='date'
                            name='move_out_date'
                            label='End Date'
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ alignSelf: 'center' }}>
                        <Button fullWidth variant='contained'> Search </Button>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                    <Box component={Grid} item sx={{ display: { xs: 'none', md: 'block' } }} md={3} lg={2}>
                        <Typography variant="h5"> Filter </Typography>
                    </Box>
                    <Grid item xs={12} md={9} lg={10}>
                        <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', mt: 2, mb: 2, ml: 1, width: '100%' }}>
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
                            <FormControl>
                                <InputLabel id="sort-by"> Sort By </InputLabel>
                                <Select
                                    labelId="sort-by"
                                    label="Sort By"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <MenuItem value='-rent'> Price: Descending </MenuItem>
                                    <MenuItem value='rent'> Price: Ascending </MenuItem>
                                    <MenuItem value='-created_at'> Date Listed: Newest First </MenuItem>
                                    <MenuItem value='created_at'> Date Listed: Oldest First </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        { open && <CreateListingPage open={open} handleClose={() => setOpen(false)} /> }
                        <Grid container spacing={2}>
                            { 
                                listingsQuery.data && listingsQuery.data.map(listing => 
                                    <Grid item xs={12} sm={6} md={6} lg={4} key={listing.id}>
                                        <ListingCard listing={listing} />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
                
            </Container>
        </Box>
    )
}

export default ListingsPage;