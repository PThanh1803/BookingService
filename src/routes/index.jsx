import { createBrowserRouter } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]); 