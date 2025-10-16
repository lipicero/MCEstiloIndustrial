import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import ContactoPage from './pages/ContactoPage';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import GaleriaPage from './pages/GaleriaPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
