import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import GameSelection from './ui/GameSelection';
import { RoutedGamePage } from './ui/GamePage';

const isStandalone =
  typeof window !== 'undefined' &&
  window.matchMedia('(display-mode: standalone)').matches;

const Router = isStandalone ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <div className="LayoutBg">
      <div className="LayoutHeader" />
      <div className="LayoutMain">
        <Router>
          <div className="App">
            <div className="LayoutFlowerBorder" />
            <Routes>
              <Route path="/" element={<GameSelection />} />
              <Route path="/g/pelit" element={<GameSelection />} />
              <Route path="/g/:gameId" element={<RoutedGamePage />} />
              <Route path="/g/:gameId/:sceneId" element={<RoutedGamePage />} />
              <Route
                path="/g/:gameId/:sceneId/:itemIds"
                element={<RoutedGamePage />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}
