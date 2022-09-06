import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useGetMySessionQuery } from '../services/session';
import { useGetUserQuery, useEditUserMutation } from '../services/user';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

function EditProfilePage(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        display_name: '',
        username: '',
        email: '',
        password: '',
        old_password: '',
    });
    const { data: user_id } = useGetMySessionQuery({}, {
        refetchOnMountOrArgChange: true
    });
    const userQuery = useGetUserQuery(user_id, {
        refetchOnMountOrArgChange: true,
        skip: user_id === undefined
    });
    const [editUser] = useEditUserMutation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setUser({
            display_name: userQuery.data?.display_name ?? '',
            username: userQuery.data?.username ?? '',
            email: userQuery.data?.email ?? '',
            password: '',
            old_password: '',
        })
    }, [userQuery.data]);

    async function handleSubmit(e) {
        try {
            await editUser({...user, id: user_id }).unwrap();
            enqueueSnackbar('User Successfully Updated', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar(e.data.message, { variant: 'error' });
        }
    }

    function handleChange(e) {
        setUser(user => ({
            ...user,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <Box>
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' sx={{ mr: 1 }} onClick={() => navigate('/profile')}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant='h5'> Edit Profile </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                { userQuery.data && 
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Display Name' name='display_name' value={user.display_name} onChange={handleChange} /> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Username' name='username' value={user.username} onChange={handleChange} /> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Email' name='email' type='email' value={user.email} onChange={handleChange} /> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Current Password' name='password' type='password' value={user.old_password} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Enter New Password' name='old_password' type='password' value={user.password} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={handleSubmit}> Update </Button>
                    </Grid>
                </Grid>
                }
            </Container>
        </Box>
    )
}

export default EditProfilePage;