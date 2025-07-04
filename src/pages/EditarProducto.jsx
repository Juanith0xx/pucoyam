import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditarProducto = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    stock: '',
    proveedor: '',
    sku: ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Error al obtener el producto');
        const data = await res.json();
        setFormulario(data);
      } catch (error) {
        console.error(error);
        setMensaje('❌ No se pudo cargar el producto');
      }
    };

    fetchProducto();
  }, [id, token]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formulario)
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje('✅ Producto actualizado');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMensaje(`❌ Error: ${data.error || 'No se pudo actualizar'}`);
      }
    } catch (error) {
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Editar producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'precio', 'stock', 'proveedor', 'sku'].map((campo) => (
          <input
            key={campo}
            name={campo}
            value={formulario[campo]}
            onChange={handleChange}
            placeholder={`Editar ${campo}`}
            required
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
          />
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Guardar cambios
        </button>

        {mensaje && <p className="mt-2 text-center text-sm">{mensaje}</p>}
      </form>
    </div>
  );
};

export default EditarProducto;
