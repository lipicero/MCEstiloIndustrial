import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

import ContactoPage from './pages/ContactoPage';
import HomePage from './pages/HomePage'
import NosotrosPage from './pages/NosotrosPage'
import GaleriaPage from './pages/GaleriaPage'

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
