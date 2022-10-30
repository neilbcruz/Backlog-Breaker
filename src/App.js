import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import PageHeader from './components/PageHeader/PageHeader';
import VideoGamesPage from './pages/VideoGamesPage/VideoGamesPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignPage from './components/SignPage/SignPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <PageHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/vgames' element={<VideoGamesPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;