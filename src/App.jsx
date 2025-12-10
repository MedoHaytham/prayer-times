import './App.css';
import RootLayout from './layout/rootLayouts';
import PrayerTimes from './pages/prayerTimes';
import Quran from './pages/quran';
import SurahPage from './pages/surahPage';
import Azkar from './pages/azkar';
import ErrorPage from './pages/errorPage';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ZkerPage from './pages/zkerPage';
import QiblaCompass from './pages/qiblaCompass';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<PrayerTimes />} />
            <Route path="quran" element={<Quran />} />
            <Route path="quran/surah/:num" element={<SurahPage />} />
            <Route path="azkar" element={<Azkar />} />
            <Route path="azkar/zker/:category" element={<ZkerPage />} />
            <Route path="qibla-compass" element={<QiblaCompass />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;