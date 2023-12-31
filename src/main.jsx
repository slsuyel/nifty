import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/routes';
import AuthProviders from './provider/AuthProviders';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
     <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
)
