import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useGetMySessionQuery, useDeleteMySessionMutation } from '../services/session';
import { useGetUserQuery } from '../services/user';

function ProfilePage() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { data: user_id, isError: isNotLoggedIn } = useGetMySessionQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteMySession] = useDeleteMySessionMutation();
    const userQuery = useGetUserQuery(user_id, {
        refetchOnMountOrArgChange: true,
        skip: user_id === undefined || isNotLoggedIn
    });

    async function logout() {
        try {
            await deleteMySession().unwrap();
        } catch (e) {
            console.log(e);
        }
        navigate('/login', { replace: true });
    }

    return (
        <Box>
            <AppBar sx={{ position: 'sticky' }}>
                <Toolbar>
                    <Typography variant="h5"> Profile </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                { isNotLoggedIn?
                    <Box>
                        <Typography> To view profile details, please</Typography>
                        <Button variant='contained' component={Link} to='/login'> Log In </Button>
                        <Typography> OR </Typography>
                        <Button variant='contained' component={Link} to='/register'> Create an Account </Button>
                    </Box>
                    :
                    userQuery.data?
                    <Box>
                        <Typography variant="h6"> Personal Information </Typography>
                        <Typography> Name: { userQuery.data.display_name || 'N/A' } </Typography>
                        <Typography> Username: { userQuery.data.username } </Typography>
                        <Typography> Email: { userQuery.data.email || 'N/A' } </Typography>
                        <Button component={Link} to={`edit`} variant='outlined'> Edit Profile </Button>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <Button variant='contained' onClick={logout}> Logout </Button>
                    </Box>
                    :
                    <Box>
                        <Typography> Loading... </Typography>
                    </Box>
                }
                {/*<Typography variant="h6"> My Listings </Typography>*/}
                {/*<ListingCard listing={{ accommodationType: 'Two Bedrooms', location: 'Rez-One Fergus House', rent: 900, availability: 3, moveInDate: '11/15/2022', moveOutDate: '01/05/2023', imageUrl: 'https://rezone.mediatownprojects.com/uploads/imagemanager/image_5ad4c0fb3792e.jpg' }} />*/}
            </Container>
        </Box>
    )
}

export default ProfilePage;