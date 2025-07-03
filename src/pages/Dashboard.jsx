import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { usuario, token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProductos(data);
        } else {
          console.error('Error al obtener productos');
        }
      } catch (error) {
        console.error('Error de red:', error.message);
      }
    };

    fetchProductos();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>
      <p className="mb-6">
        Bienvenido, <strong>{usuario?.correo}</strong> ({usuario?.rol})
      </p>

      <h2 className="text-xl font-semibold mb-2">Productos registrados:</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((prod) => (
                <tr key={prod._id} className="border-t">
                  <td className="px-4 py-2">{prod.nombre}</td>
                  <td className="px-4 py-2">{prod.sku}</td>
                  <td className="px-4 py-2">${prod.precio}</td>
                  <td className="px-4 py-2">{prod.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
