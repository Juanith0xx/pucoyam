import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/productos/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const calcularCajas = () => {
    if (!producto || !producto.rendimiento) return;
    const cajas = Math.ceil(parseFloat(metrosCuadrados) / producto.rendimiento);
    setResultado(isNaN(cajas) ? 0 : cajas);
  };

  if (!producto) return <p className="p-4">Cargando producto...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="bg-gray-100 h-64 md:h-full flex items-center justify-center rounded-lg">
          <img
            src="/img/placeholder-ceramica.jpg"
            alt={producto.nombre}
            className="object-contain max-h-full"
          />
        </div>

        {/* Info del producto */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{producto.nombre}</h1>
            <p className="text-sm text-gray-500">Proveedor: {producto.proveedor}</p>
            <p className="text-sm text-gray-500">SKU: {producto.sku}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xl text-blue-600 font-semibold">
              ${producto.precio.toLocaleString()} <span className="text-sm font-normal">/ m²</span>
            </p>
            {producto.rendimiento && (
              <p className="text-sm text-gray-500">
                Rendimiento por caja: {producto.rendimiento} m² — Caja desde&nbsp;
                <strong>${(producto.precio * producto.rendimiento).toLocaleString()}</strong>
              </p>
            )}
            <p className="text-sm text-gray-500">Stock disponible: {producto.stock}</p>
          </div>

          {/* Calculadora
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Superficie a cubrir (m²)
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                value={metrosCuadrados}
                onChange={(e) => setMetrosCuadrados(e.target.value)}
                className="w-32 p-2 border rounded"
                placeholder="Ej. 10"
              />
              <button
                onClick={calcularCajas}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Calcular
              </button>
            </div>
            {resultado > 0 && (
              <p className="mt-2 text-sm text-green-700 font-medium">
                Necesitas: {resultado} caja(s)
              </p>
            )}
          </div> */}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button className="w-full sm:w-auto bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
