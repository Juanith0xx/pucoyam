import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 pb-4">
      <div className="max-w-screen-xl mx-auto flex items-center py-2 px-4">
        {/* Logo */}
        <RouterLink to="/" className="mr-6 flex-shrink-0">
          <img src="/img/Logo.png" alt="Logo" className="h-16" />
        </RouterLink>

        {/* Mega-menú escritorio */}
        <ul className="hidden md:flex gap-4 text-sm font-semibold">
          <li className="relative group">
            <button className="hover:text-red-600">Categorías ▾</button>
            <div className="absolute left-0 top-full w-screen bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="max-w-screen-xl mx-auto grid grid-cols-4 py-3 px- gap-1">
                <div>
                  <p className="font-bold mb-2">Baño y Cocina</p>
                  <ul className="space-y-1 text-xs">
                    <li><RouterLink to="/banos/muebles">Muebles de Baño</RouterLink></li>
                    <li><RouterLink to="/banos/griferia">Grifería</RouterLink></li>
                    <li><RouterLink to="/cocina/lavaplatos">Lavaplatos</RouterLink></li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">Herramientas</p>
                  <ul className="space-y-1 text-xs">
                    <li><RouterLink to="/herramientas/inalambricas">Inalámbricas</RouterLink></li>
                    <li><RouterLink to="/herramientas/manuales">Manuales</RouterLink></li>
                    <li><RouterLink to="/herramientas/maquinaria">Maquinaria</RouterLink></li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">Pisos y Revestimientos</p>
                  <ul className="space-y-1 text-xs">
                    <li><RouterLink to="/pisos/ceramicas">Cerámicas</RouterLink></li>
                    <li><RouterLink to="/pisos/parquet">Parquet</RouterLink></li>
                    <li><RouterLink to="/pisos/deck">Deck Exterior</RouterLink></li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">Decoración</p>
                  <ul className="space-y-1 text-xs">
                    <li><RouterLink to="/decoracion/iluminacion">Iluminación</RouterLink></li>
                    <li><RouterLink to="/decoracion/textiles">Textiles</RouterLink></li>
                    <li><RouterLink to="/decoracion/accesorios">Accesorios</RouterLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>

        {/* Buscador */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 mx-6 relative"
        >
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 border rounded-full py-2 pl-4 pr-12 focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Botón móvil */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg w-full absolute top-full left-0 z-40">
          <form onSubmit={handleSearch} className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-full py-2 pl-4 pr-10"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          <ul className="flex flex-col p-4 space-y-2 text-sm">
            <li>
              <details>
                <summary className="font-semibold">Categorías</summary>
                <ul className="mt-2 pl-4 space-y-1">
                  <li><RouterLink onClick={() => setMenuOpen(false)} to="/banos/muebles">Muebles de Baño</RouterLink></li>
                  <li><RouterLink onClick={() => setMenuOpen(false)} to="/herramientas/inalambricas">Herramientas</RouterLink></li>
                  <li><RouterLink onClick={() => setMenuOpen(false)} to="/pisos/ceramicas">Cerámicas</RouterLink></li>
                  <li><RouterLink onClick={() => setMenuOpen(false)} to="/decoracion/iluminacion">Iluminación</RouterLink></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
