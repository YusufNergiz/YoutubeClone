import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements} from "react-router-dom";
import { Route } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Video from './pages/Video';
import Error from './pages/Error';

import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './pages/Signin';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />}>
        
      </Route>
      <Route path="/video">
        <Route path=":id" element={<Video />}></Route>
      </Route>
      <Route path='/signin'>
        <Route index element={<Signin />}></Route>
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router}/>
}

export default App
