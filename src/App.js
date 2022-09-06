import Box from '@mui/material/Box';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Outlet />
        </Box>
    );
}

export default App;
