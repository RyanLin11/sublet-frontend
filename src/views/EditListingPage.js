import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useGetListingQuery, useEditListingMutation } from '../services/listing';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

function EditListingPage() {
    let { id } = useParams();
    const [editListing] = useEditListingMutation();
    const { enqueueSnackbar } = useSnackbar();
    const getListingQuery = useGetListingQuery(id, {
        refetchOnMountOrArgChange: true
    });
    const [listing, setListing] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (getListingQuery.data) {
            setListing({
                ...getListingQuery.data,
                move_in_date: getListingQuery.data.move_in_date.substring(0, 10),
                move_out_date: getListingQuery.data.move_out_date.substring(0, 10),
            })
        }
    }, [getListingQuery.data]);

    function handleChange(e) {
        setListing(listing => ({...listing, [e.target.name]: e.target.value }));
    }

    async function handleSubmit() {
        try {
            await editListing(listing).unwrap();
            enqueueSnackbar('Listing Edited Successfully', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar(e.data.message, { variant: 'error' });
        }
    }

    return (
        <Container>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" aria-label="back" onClick={() => navigate('/listings')}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography> Edit Listing #{id} </Typography>                    
                </Toolbar>
            </AppBar>
            { listing &&
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label='Address' 
                        name='address' 
                        value={listing.address}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Accommodation Type'
                        name='accommodation_type'
                        value={listing.accommodation_type}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label='Rent' 
                        name='rent' 
                        value={listing.rent}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label='Description' 
                        name='description'
                        value={listing.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label='Move In Date'
                        type='date'
                        name='move_in_date'
                        value={listing.move_in_date}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label='Move Out Date' 
                        type='date'
                        name='move_out_date'
                        value={listing.move_out_date}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Contact Information'
                        name='contact_info'
                        value={listing.contact_info}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant='contained' onClick={handleSubmit}> Save Changes </Button>
                </Grid>
            </Grid>
            }
        </Container>
    )
}

export default EditListingPage;