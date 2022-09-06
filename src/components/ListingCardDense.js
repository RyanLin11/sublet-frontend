import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ListingCardDense({ listing }) {
    return (
        <Card>
            <CardMedia
                component="img"
                image={listing.imageUrl}
                alt={listing.location}
            />
            <CardContent>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyIcon /> 
                        <Typography sx={{ marginLeft: 1 }}> ${listing.rent} / mo </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GroupIcon /> 
                        <Typography sx={{ marginLeft: 1 }}> ${listing.availability} available </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon />
                        <Typography sx={{ marginLeft: 1 }}> {listing.moveInDate} - {listing.moveOutDate} </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ListingCardDense;