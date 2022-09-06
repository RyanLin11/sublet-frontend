import { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import CloseIcon from '@mui/icons-material/Close';
import './Autocomplete.css';
import { useCreateListingMutation } from '../services/listing';
import { useSnackbar } from 'notistack';

function CreateListingPage({ open, handleClose }) {
    const [listing, setListing] = useState({
        rent: 0,
        address: '',
        accommodation_type: '',
        description: '',
        move_in_date: '',
        move_out_date: '',
        contact_info: '',
    });

    function handleChange(e) {
        setListing(listing => ({
            ...listing,
            [e.target.name]: e.target.value
        }));
    }

    let [createListing] = useCreateListingMutation();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(e) {
        try {
            await createListing(listing).unwrap();
            enqueueSnackbar('Listing Created Successfully');
            handleClose();
        } catch (e) {
            enqueueSnackbar(e.data.message);
        }
    }
    
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h5"> Create Listing </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit}>
                        create
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel> Address </InputLabel>
                            <OutlinedInput
                                inputComponent={Autocomplete}
                                label="Address"
                                inputProps={{
                                    apiKey: process.env.REACT_APP_MAPS_API_KEY,
                                    onPlaceSelected: ({ formatted_address }) => { setListing(listing => ({...listing, address: formatted_address }))},
                                    options: {
                                        bounds: {
                                            north: 43.4643 + 0.1,
                                            south: 43.4643 - 0.1,
                                            east: -80.5204 + 0.1,
                                            west: -80.5204 - 0.1,
                                        },
                                        componentRestrictions: { country: "ca" },
                                        types: ["establishment"],
                                        fields: ["place_id", "formatted_address", "photos"],
                                        strictBounds: false,
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel> Accommodation Type </InputLabel>
                            <Select
                                name='accommodation_type'
                                value={listing.accommodation_type}
                                label='Accommodation Type'
                                onChange={handleChange}
                            >
                                <MenuItem value='Condo'> Condo </MenuItem>
                                <MenuItem value='House'> House </MenuItem>
                                <MenuItem value='Apartment'> Apartment </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Move In Date'
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            name='move_in_date'
                            value={listing.move_in_date}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Move Out Date'
                            type='date'
                            InputLabelProps={{ shrink: true }}
                            name='move_out_date'
                            value={listing.move_out_date}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Monthly Rent'
                            type='number'
                            name='rent'
                            value={listing.rent}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Contact Info'
                            name='contact_info'
                            value={listing.contact_info}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Description'
                            multiline
                            name='description'
                            value={listing.description}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    )
}

export default CreateListingPage;