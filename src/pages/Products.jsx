import { useEffect, useState } from 'react';
import { ShoppingCart, Heart, Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const actualizarCantidad = (id, nuevaCantidad) => {
    const producto = productos.find((p) => p._id === id);
    if (!producto) return;

    const limitada = Math.max(0, Math.min(nuevaCantidad, producto.stock));

    setCarrito((prev) => ({
      ...prev,
      [id]: limitada,
    }));
  };

  const agregarAlCarrito = (id) => {
    const cantidad = carrito[id] ?? 0;
    if (cantidad > 0) {
      console.log(`✔️ Añadido al carrito: ${cantidad} unidad(es) del producto ${id}`);
    }
  };

  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center font-Poppins">Productos disponibles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((prod) => {
          const cantidad = carrito[prod._id] ?? 0;
          const agotado = prod.stock === 0;

          return (
            <div
              key={prod._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
            >
              <Link to={`/producto/${prod._id}`} className="block">
                <div className="h-40 bg-gray-100 mb-4 rounded overflow-hidden">
                  {prod.imagenUrl?.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      className="h-full"
                    >
                      {prod.imagenUrl.map((url, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={url}
                            alt={`Imagen ${idx + 1} de ${prod.nombre}`}
                            className="h-40 w-full object-contain"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                      Sin imagen
                    </div>
                  )}
                </div>

                <h3 className="text-md font-semibold text-gray-800 leading-snug line-clamp-2">
                  {prod.nombre}
                </h3>
              </Link>

              <div className="text-sm text-gray-500 mt-2">
                <p>SKU: {prod.sku}</p>
                <p>Proveedor: {prod.proveedor}</p>
                <p className={`font-medium ${prod.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
                  Stock: {prod.stock}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    className="w-7 h-7 border rounded text-lg font-bold disabled:opacity-40"
                    onClick={() => actualizarCantidad(prod._id, cantidad - 1)}
                    disabled={cantidad <= 0}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{cantidad}</span>
                  <button
                    className="w-7 h-7 border rounded text-lg font-bold disabled:opacity-40"
                    onClick={() => actualizarCantidad(prod._id, cantidad + 1)}
                    disabled={cantidad >= prod.stock}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => agregarAlCarrito(prod._id)}
                  disabled={cantidad === 0 || agotado}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm rounded transition ${
                    cantidad === 0 || agotado
                      ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                      : 'bg-blue-600 text-white hover:bg-[#f7c045]'
                  }`}
                >
                  {agotado ? 'Sin stock' : 'Agregar'}
                  {!agotado && <ShoppingCart size={20} />}
                  {cantidad > 0 && !agotado && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                      {cantidad}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center text-gray-400 mt-3 text-xs">
                <button className="flex items-center gap-1 hover:text-black transition">
                  <Heart size={14} /> Guardar
                </button>
                <button className="flex items-center gap-1 hover:text-black transition">
                  <Shuffle size={14} /> Comparar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
