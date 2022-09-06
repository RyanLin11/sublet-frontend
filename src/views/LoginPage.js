import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <Box>
            <TextField
                required
                label='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <TextField
                required
                label='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Button variant='contained' onClick={handleSubmit}> Login </Button>
            <Typography> Don't have an account? </Typography> 
            <Link to='/register'> 
                <Typography> Create an account </Typography> 
            </Link>
        </Box>
    )
}

export default LoginPage;