import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin ,  Clock } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-6 md:px-16">
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 text-sm">

        {/* Información general */}
        <div className="md:col-span-1">
          <h4 className="text-3xl font-bold mb-3 text-white">Ferretería Pucoyam</h4>
          <p className="text-gray-400">
            Soluciones en herramientas, materiales de construcción y mobiliario a medida. 
            Atención personalizada en todo Chile.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-2xl font-semibold mb-3 text-white underline">Navegación</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/productos" className="hover:text-white">Productos</a></li>
            <li><a href="/servicios" className="hover:text-white">Servicios</a></li>
            <li><a href="/nosotros" className="hover:text-white">Nosotros</a></li>
            <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <h4 className="text-2xl underline font-semibold mb-3 text-white">Horarios</h4>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2"><Clock size={20} />Lunes a Viernes: 08:30 - 18:30</li>
            <li className="flex items-center gap-2"><Clock size={20} />Sábados: 08:30 - 18:00</li>
            <li className="flex items-center gap-2"><Clock size={20} />Domingos: Cerrado</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-2xl underline font-semibold mb-3 text-white">Contacto</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2"><Phone size={20} /> +56 9 1234 5678</li>
            <li className="flex items-center gap-2"><Mail size={20} /> contacto@pucoyam.cl</li>
            <li className="flex items-center gap-2"><MapPin size={20} /> Av. Santa Rosa 0185, La Pintana</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-2xl underline font-semibold mb-3 text-white">Síguenos</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500" aria-label="Facebook"><Facebook size={40} /></a>
            <a href="#" className="hover:text-pink-500" aria-label="Instagram"><Instagram size={40} /></a>
            <a href="#" className="hover:text-green-500" aria-label="WhatsApp"><FaWhatsapp size={40} /></a>
            <a href="#" className="hover:text-white" aria-label="TikTok"><FaTiktok size={40} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Ferretería Pucoyam. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
