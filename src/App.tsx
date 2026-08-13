import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { FindGamesPage } from './pages/FindGamesPage';
import { GameDetailsPage } from './pages/GameDetailsPage';
import { CreateGamePage } from './pages/CreateGamePage';
import { CourtsPage } from './pages/CourtsPage';
import { CourtDetailsPage } from './pages/CourtDetailsPage';
import { PlayersPage } from './pages/PlayersPage';
import { PlayerProfilePage } from './pages/PlayerProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { CommunityPage } from './pages/CommunityPage';
import { LoginPage, SignupPage, ForgotPasswordPage } from './pages/AuthPages';

// Scroll To Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-lime-400 selection:text-slate-950">
          <ToastContainer />
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/games" element={<FindGamesPage />} />
              <Route path="/games/:id" element={<GameDetailsPage />} />
              <Route path="/create-game" element={<CreateGamePage />} />
              <Route path="/courts" element={<CourtsPage />} />
              <Route path="/courts/:id" element={<CourtDetailsPage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<PlayerProfilePage />} />
              <Route path="/profile" element={<PlayerProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>

          <Footer />
          <MobileNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
