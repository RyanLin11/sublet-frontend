import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemButton from '@mui/material/ListItemButton';
import { useState } from 'react';
import defaultImage from './defaultImage.jpeg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useEditListingMutation, useDeleteListingMutation } from '../services/listing';
import { useNavigate } from 'react-router-dom';

function ListingCard({ listing }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="profile-photo"> R </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={listing.accommodation_type}
                subheader={listing.address}
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate(`/listings/${listing.id}/edit`)}>
                            <ListItemText primary="Edit" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Delete" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
            <CardMedia
                component="img"
                height="194"
                image={listing.imageUrl || defaultImage}
                alt={listing.address}
            />
            <CardContent>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyIcon /> 
                        <Typography sx={{ marginLeft: 1 }}> ${listing.rent} / mo </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GroupIcon /> 
                        <Typography sx={{ marginLeft: 1 }}> {listing.availability || 'N/A' } available </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon />
                        <Typography sx={{ marginLeft: 1 }}> {new Date(listing.move_in_date).toLocaleDateString()} - {new Date(listing.move_out_date).toLocaleDateString()} </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ListingCard;