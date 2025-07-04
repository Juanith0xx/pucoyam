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
import Unauthorized from './pages/Unauthorized';
import CrearProducto from './pages/admin/CrearProducto';
import EditarProducto from './pages/EditarProducto';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="pt-20 flex-grow">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Products />} />
            <Route path="/producto/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas privadas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={['Admin', 'Supervisor', 'Vendedor']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/crear-producto"
              element={
                <PrivateRoute roles={['Admin', 'Supervisor']}>
                  <CrearProducto />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/editar-producto/:id"
              element={
                <PrivateRoute roles={['Admin', 'Supervisor']}>
                  <EditarProducto />
                </PrivateRoute>
              }
            />

            {/* Fallback: ruta no encontrada → redirige a login */}
            <Route path="*" element={<Login />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppBubble />
      </div>
    </AuthProvider>
  );
}

export default App;
