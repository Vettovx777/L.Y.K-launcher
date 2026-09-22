import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import MyGames from './pages/MyGames';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Emulators from './pages/Emulators';
import Recommendations from './pages/Recommendations';
import News from './pages/News';
import Store from './pages/Store';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<MyGames />} />
          <Route path="emulators" element={<Emulators />} />
          <Route path="activity" element={<Activity />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="news" element={<News />} />
          <Route path="store" element={<Store />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
