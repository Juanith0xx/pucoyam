const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso denegado</h1>
      <p className="text-gray-600">No tienes permiso para ver esta página.</p>
    </div>
  );
};

export default Unauthorized;