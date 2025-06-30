import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBubble = () => {
  const phoneNumber = "56912345678"; // Tu número sin +

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setBounce(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setBounce(false), 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-4 right-4 z-50 
        bg-[#25d366] hover:bg-green-600 
        text-white 
        rounded-full shadow-lg transition duration-500
        p-3 sm:p-4 md:p-5
        ${bounce ? "animate-bounce" : ""}
      `}
      style={{ 
        // opcional: para que el botón no quede muy pegado al borde en pantallas grandes
        marginRight: '1rem', 
        marginBottom: '1rem'
      }}
    >
      <FaWhatsapp className="text-2xl sm:text-3xl md:text-1xl" />
    </a>
  );
};

export default WhatsAppBubble;