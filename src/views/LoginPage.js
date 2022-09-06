import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useCreateSessionMutation, useGetMySessionQuery } from '../services/session';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function LoginPage() {
    const mySessionQuery = useGetMySessionQuery({}, {
        refetchOnMountOrArgChange: true,
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [createSession] = useCreateSessionMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!mySessionQuery.isFetching && mySessionQuery.isSuccess) {
            navigate('/listings', { replace: true });
        }
    }, [mySessionQuery.isFetching, mySessionQuery.isSuccess]);

    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(e) {
        try {
            await createSession({ username, password }).unwrap();
        } catch (e) {
            enqueueSnackbar(e.data.message, { variant: 'error' });
            setPassword('');
        }
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth='sm'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}> Log In </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type='password'
                            label='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' onClick={handleSubmit}> Login </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Typography> Don't have an account? &nbsp; </Typography> 
                        <Link to='/register'> 
                            <Typography> Create an account </Typography> 
                        </Link>
                    </Grid>
                </Grid>
            </Container> 
        </Box>
    )
}

export default LoginPage;