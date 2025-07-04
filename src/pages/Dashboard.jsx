import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('No autorizado');

        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setError('❌ No se pudieron cargar los productos. Verifica tus permisos o el estado del servidor.');
      }
    };

    if (token) {
      obtenerProductos();
    }
  }, [token]);

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`http://localhost:4000/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setProductos(productos.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.sku?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos registrados</h1>
        <button
          onClick={() => navigate('/admin/crear-producto')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Crear producto
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Buscar por nombre o SKU"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded shadow-sm"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2">Precio</th>
              <th className="px-3 py-2">Proveedor</th>
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(producto => (
              <tr key={producto._id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{producto.nombre}</td>
                <td className="px-3 py-2">
                  {producto.stock < 5 ? (
                    <span className="text-red-600 font-semibold">
                      {producto.stock} ⚠️
                    </span>
                  ) : (
                    producto.stock
                  )}
                </td>
                <td className="px-3 py-2">${producto.precio}</td>
                <td className="px-3 py-2">{producto.proveedor}</td>
                <td className="px-3 py-2">{producto.sku}</td>
                <td className="px-3 py-2 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/editar-producto/${producto._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(producto._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No se encontraron productos
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
