import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements,  Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layouts from './components/Layouts';
import Root from './components/Pages/Root';
import {Signup} from './components/Pages/Signup';
import { Provider } from 'react-redux';
import store from "./store/store"
import Login from './components/Pages/Login';
import { Success } from './components/Pages/Success';
import ProtectedRoues from './components/Pages/ProtectedRoues';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layouts />}>
        <Route index element={<Root />} />
        <Route path='/auth' element={<Signup />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/success' element={<ProtectedRoues Component={Success} />} />
      </Route>
    )
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
