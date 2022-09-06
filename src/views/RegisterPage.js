import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useState } from 'react';
import { useCreateUserMutation } from '../services/user';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function RegisterPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [repassword, setRepassword] = useState('');
    const [createUser] = useCreateUserMutation();
    const { enqueueSnackbar } = useSnackbar();

    function handleChange(e) {
        setUser(user => ({
            ...user,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        if (repassword !== user.password) {
            enqueueSnackbar('Passwords do not match');
            return;
        }
        try {
            await createUser(user).unwrap();
            navigate('/login');
        } catch (e) {
            enqueueSnackbar(e.data.message, { variant: 'error' });
            setUser(user => ({...user, password: ''}));
        }
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}> Register </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label='Username'
                            name='username'
                            value={user.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label='Password'
                            name='password'
                            onChange={handleChange}
                            value={user.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label='Re-Enter Password'
                            name='password2'
                            onChange={(e) => setRepassword(e.target.value)}
                            value={repassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' onClick={handleSubmit}> Register </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography> Already have an account? &nbsp; </Typography>
                        <Link to='/login'> <Typography> Log In </Typography> </Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default RegisterPage;