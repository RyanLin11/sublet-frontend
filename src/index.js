import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import ListingsPage from './views/ListingsPage';
import ListingPage from './views/ListingsPage';
import EditListingPage from './views/EditListingPage';
import CreateListingPage from './views/CreateListingPage';
import ProfilePage from './views/ProfilePage';
import EditProfilePage from './views/EditProfilePage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ProtectedApp from './views/ProtectedApp';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<LandingPage />} />
                        <Route element={<ProtectedApp />}>
                            <Route path="listings">
                                <Route index element={<ListingsPage />} />
                                <Route path="create" element={<CreateListingPage />} />
                                <Route path=":id">
                                    <Route index element={<ListingPage />} />
                                    <Route path="edit" element={<EditListingPage />} />
                                </Route>
                            </Route>

                            <Route path="profile">
                                <Route index element={<ProfilePage />} />
                                <Route path='edit' element={<EditProfilePage />} />
                            </Route>
                        </Route>
                        <Route path='login' element={<LoginPage />} />
                        <Route path='register' element={<RegisterPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
