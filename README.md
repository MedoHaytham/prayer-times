# Islamic App - Prayer Times, Quran, Azkar & Qibla 🕌

A comprehensive React-based Islamic web application providing prayer times with Adhan notifications, full Quran reading, daily Azkar, and a Qibla compass. 

[**View Live Demo**](https://MedoHaytham.github.io/prayer-times)

## ✨ Features

- **Prayer Times (أوقات الصلاة):** Accurate daily prayer timings for multiple cities in Egypt, highlighting the next prayer with a dynamic countdown, Hijri date display, and automatic Adhan playback when it's time to pray.
- **Holy Quran (القرآن الكريم):** Browse and read all 114 Surahs (chapters) of the Holy Quran, presented in an easy-to-navigate layout.
- **Azkar (الأذكار):** A collection of essential daily supplications including Morning, Evening, and other categories of Azkar.
- **Qibla Compass (اتجاه القبلة):** Real-time compass feature utilizing device orientation and GPS to help accurately locate the Qibla (Kaaba) direction.

## 🛠️ Tech Stack

- **ReactJS:** Frontend building framework.
- **React Router (HashRouter):** Handling SPA navigation.
- **Bootstrap / CSS:** Styling, UI components, and responsive layout.
- **Axios:** Managing API requests.
- **React Toastify:** For elegant error and alert notifications.
- **FontAwesome:** System icons.

## 📡 APIs Used

1. **[Aladhan API](https://aladhan.com/prayer-times-api):** 
   - Used to fetch accurate prayer times based on city and country.
   - Calculates the Qibla direction based on the user's geographical coordinates (latitude/longitude).
2. **[AlQuran Cloud API](https://alquran.cloud/api):** 
   - Provides comprehensive listings of Surahs, verses, and revelation types.

## 📁 Project Structure

```text
src/
├── assets/         # Static image assets and compass icons
├── components/     # Reusable UI components (Prayer card, Surah card, Navbar)
├── layout/         # Global layout wrappers (RootLayout)
├── pages/          # Application pages/routes (PrayerTimes, Quran, Azkar, QiblaCompass)
├── App.jsx         # Main application component & routing setup
├── App.css         # Application-level styles
├── index.js        # React DOM entry point
└── index.css       # Global styles
```

## 🚀 Installation & Setup

To get a local copy up and running, follow these simple steps:

1. **Clone the repository && Navigate to the project directory:**
   ```bash
   git clone https://github.com/MedoHaytham/prayer-times.git
   cd prayer-times
   ```

2. **Install NPM Packages:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Building & Deployment

To build the app for production to the `build` folder:
```bash
npm run build
```

This project utilizes `gh-pages` for deployment. You can deploy updates using:
```bash
npm run deploy
```

---

Created with ❤️ by Mohamed Haytham.
