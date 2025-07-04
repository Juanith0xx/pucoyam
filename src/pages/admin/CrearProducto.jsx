import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CrearProducto = () => {
  const { usuario, token } = useContext(AuthContext);
  console.log('usuario actual:', usuario);
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    stock: '',
    proveedor: '',
    sku: ''
  });

  const [imagenes, setImagenes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  if (!usuario) return <p className="text-center mt-10">Cargando usuario...</p>;
  if (usuario.rol !== 'Admin' && usuario.rol !== 'Supervisor') {
    return <Navigate to="/unauthorized" />;
  }

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagenes(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formulario).forEach(([clave, valor]) => {
      formData.append(clave, valor);
    });
    imagenes.forEach((img) => formData.append('imagenes', img));

    try {
      const res = await fetch('http://localhost:4000/api/productos/crear-con-imagenes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje('✅ Producto creado exitosamente');
        setFormulario({
          nombre: '',
          precio: '',
          stock: '',
          proveedor: '',
          sku: ''
        });
        setImagenes([]);
        setTimeout(() => navigate('/admin/productos'), 1500);
      } else {
        setMensaje(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMensaje('❌ No se pudo conectar al servidor');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Crear nuevo producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'precio', 'stock', 'proveedor', 'sku'].map((campo) => (
          <input
            key={campo}
            name={campo}
            value={formulario[campo]}
            onChange={handleChange}
            placeholder={`Ingrese ${campo}`}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        ))}

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0
          file:rounded file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {imagenes.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {imagenes.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`Preview ${idx + 1}`}
                className="h-20 w-20 object-cover rounded shadow"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Crear producto
        </button>

        {mensaje && <p className="mt-2 text-sm text-center">{mensaje}</p>}
      </form>

      {/* 🖼️ Vista previa del producto */}
      {(formulario.nombre || formulario.precio || imagenes.length > 0) && (
        <div className="mt-10 p-4 border rounded bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Vista previa del producto</h3>
          <p><strong>Nombre:</strong> {formulario.nombre}</p>
          <p><strong>Precio:</strong> ${formulario.precio}</p>
          <p><strong>Stock:</strong> {formulario.stock}</p>
          <p><strong>Proveedor:</strong> {formulario.proveedor}</p>
          <p><strong>SKU:</strong> {formulario.sku}</p>

          {imagenes.length > 0 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {imagenes.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`Vista previa ${idx + 1}`}
                  className="h-20 w-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrearProducto;
