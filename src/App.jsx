import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppsBubble';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="pt-20 flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={['admin', 'supervisor', 'vendedor']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Ruta por defecto por si ingresan una ruta inválida */}
            <Route path="*" element={<Login />} />
            <Route path="/" element={<Products/>} />
            <Route path="/producto/:id" element={<ProductDetails />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppBubble />
      </div>
    </AuthProvider>
  );
}

export default App;
