import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './layout/rootLayouts';
import PrayerTimes from './pages/prayerTimes';
import Quran from './pages/quran';
import {ToastContainer } from 'react-toastify';



const router = createBrowserRouter([
  {
    path: '/prayer-times',
    element: <RootLayout />,
    children: [
      {index: true, element: <PrayerTimes />},
      {path: 'quran', element: <Quran />},
    ],
  },
]);



function App() {
  return (
    <>    
      <ToastContainer />
      <RouterProvider router={router} />
    </>

  );
}

export default App;
