import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function FilterMenu() {
    const [price, setPrice] = useState([500, 700]);
    const [groupSize, setGroupSize] = useState(1);

    const handleChange = (event, newPrice) => {
        setPrice(newPrice);
    }

    return (
        <Container maxWidth='sm' sx={{ mt: 1, mb: 1 }}>
            <Typography variant="h5"> Filter Options </Typography>
            <Typography variant="h6"> Accommodation Type </Typography>
            <Grid container>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label='1 Bedroom Suite' />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label='2 Bedroom Suite' />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label='3 Bedroom Suite' />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label='4 Bedroom Suite' />
                    </FormGroup>
                </Grid>
            </Grid>
            <Typography variant="h6"> Price </Typography>
            <Typography gutterBottom> Range: ${price[0]} - ${price[1]} </Typography>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="off"
                getAriaValueText={(price) => `$${price}`}
                min={0}
                max={1500}
                step={50}
            />
            <TextField
                value={groupSize}
                label="Availability"
                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                }}
                onChange={(e) => setGroupSize(e.target.value)}
            />
            <Button variant='outlined'> Filter </Button>
        </Container>
    );
}

export default FilterMenu;