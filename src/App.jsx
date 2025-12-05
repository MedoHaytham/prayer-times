import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './layout/rootLayouts';
import PrayerTimes from './pages/prayerTimes';
import Quran from './pages/quran';
import {ToastContainer } from 'react-toastify';


const basename = process.env.PUBLIC_URL || '/';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <PrayerTimes /> },
      { path: 'quran', element: <Quran /> },
    ],
  },
], { basename });



function App() {
  return (
    <>    
      <ToastContainer />
      <RouterProvider router={router} />
    </>

  );
}

export default App;
