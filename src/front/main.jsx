import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StoreProvider } from './hooks/useGlobalReducer';
import { BackendURL } from './components/BackendURL';
import SignUp from './pages/SignUp';
import{ router} from './routes';

// const router = createBrowserRouter([
//     {
//         path: "/signup",
//         element: <SignUp />,
//     },
// ]);

const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
        return (
            <React.StrictMode>
                <BackendURL />
            </React.StrictMode>
        );
    }

    return (
        <React.StrictMode>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
