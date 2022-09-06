import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
        <Box>
            <TextField
                required
                label='Username'
                name='username'
                value={user.username}
                onChange={handleChange}
             />
             <TextField
                required
                type='password'
                label='Password'
                name='password'
                onChange={handleChange}
                value={user.password}
            />
            <TextField
                required
                type='password'
                label='Re-Enter Password'
                name='password2'
                onChange={(e) => setRepassword(e.target.value)}
                value={repassword}
            />
            <Button variant='contained' onClick={handleSubmit}> Register </Button>
            <Typography> Already have an account? </Typography>
            <Link to='/login'> <Typography> Log In </Typography> </Link>
        </Box>
    )
}

export default RegisterPage;