/** Título + descripción de cada página del admin (y botones a la derecha, si se pasan). */
function EncabezadoPagina({ titulo, descripcion, children }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2 mb-4">
      <div>
        <h1 className="h3 mb-1">{titulo}</h1>
        {descripcion && <p className="text-muted mb-0">{descripcion}</p>}
      </div>
      {children && <div className="d-flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export default EncabezadoPagina;
