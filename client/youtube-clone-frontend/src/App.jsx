import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements} from "react-router-dom";
import { Route } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home, { loader as homeLoader } from './pages/Home';
import Video, { loader as videoLoader } from './pages/Video';
import Error from './pages/Error';

import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './pages/Signin';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />} errorElement={<Error />}>
          <Route index element={<Home type="random"/>} loader={() => homeLoader("random")}></Route>
          <Route path='/trends' element={<Home type="trend"/>} loader={() => homeLoader("trend")}></Route>
          <Route path='/sub' element={<Home type="sub"/>} loader={() => homeLoader("sub")}></Route>
        <Route path="/video">
          <Route path=":id" element={<Video />} loader={videoLoader}></Route>
        </Route>
        <Route path='/signin'>
          <Route index element={<Signin />}></Route>
        </Route>
        </Route>
      </Route>
  )
)

function App() {
  return <RouterProvider router={router}/>

}

export default App
