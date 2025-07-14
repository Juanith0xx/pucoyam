import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      fetchUsuario(token);
    }
  }, [token]);

  const fetchUsuario = async (jwt) => {
    try {
      const res = await fetch('http://localhost:4000/api/usuarios/perfil', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsuario(data);
      } else {
        console.warn('Token válido pero sin autorización:', res.status);
        setUsuario(null);
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      setUsuario(null);
    }
  };

  const login = async ({ correo, password }) => {
    try {
      const res = await fetch('http://localhost:4000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUsuario(data.usuario); // ✅ Guarda el usuario con su nombre
        return true;
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
