import Box from '@mui/material/Box';
import { Outlet, Link } from 'react-router-dom';

import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ProtectedApp() {
    const [tab, setTab] = useState(0);

    const navOptions = [
        { 
            label: 'Listings',
            link: 'listings',
            icon: <ListIcon />,
        },
        {
            label: 'Profile',
            link: 'profile',
            icon: <AccountCircleIcon />,
        }
    ];

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            <BottomNavigation
                showLabels
                value={tab}
                onChange={(event, newTab) => setTab(newTab)}
                sx={{ flexGrow: 0 }}
            >
                { navOptions.map(({ label, link, icon }) => 
                    <BottomNavigationAction key={label} component={Link} label={label} to={link} icon={icon} />
                )}
            </BottomNavigation>
        </Box>
    );
}

export default ProtectedApp;
