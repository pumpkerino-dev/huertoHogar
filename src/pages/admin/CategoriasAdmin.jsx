import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import CategoriaForm from "../../components/admin/CategoriaForm";
import ConfirmModal from "../../components/admin/ConfirmModal";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import { useListado } from "../../hooks/useListado";
import * as categoriaService from "../../services/categoriaService";
import { mensajeDeError } from "../../api";

/**
 * CATEGORÍAS (componente nuevo del admin): Nueva categoría, Editar categoría y Eliminar categoría
 * (solo si no tiene productos; el backend responde 409 si los tiene).
 * Nota: el diagrama dice "Editar usuario" dentro de Categoría; se interpretó como
 * "Editar categoría", porque la edición de usuarios ya está en la rama Usuario.
 * Las categorías nuevas aparecen al instante en el formulario de productos y en
 * los filtros del catálogo de la tienda.
 */
function CategoriasAdmin() {
  const { datos: categorias, cargando, error, setError, recargar } =
    useListado(categoriaService.getCategorias, "No se pudieron cargar las categorías");
  const [exito, setExito] = useState("");
  const [formulario, setFormulario] = useState(null); // { categoria: null | categoría }
  const [aEliminar, setAEliminar] = useState(null);

  const confirmarEliminar = async () => {
    try {
      await categoriaService.eliminarCategoria(aEliminar.id);
      setExito(`Categoría "${aEliminar.nombre}" eliminada`);
      recargar();
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo eliminar la categoría"));
    } finally {
      setAEliminar(null);
    }
  };

  const guardar = async (datos) => {
    const editando = formulario?.categoria;
    try {
      if (editando) await categoriaService.actualizarCategoria(editando.id, datos);
      else await categoriaService.crearCategoria(datos);
    } catch (err) {
      throw new Error(mensajeDeError(err, "No se pudo guardar la categoría"), { cause: err });
    }
    setFormulario(null);
    setExito(editando ? "Categoría actualizada" : "Categoría creada");
    recargar();
  };

  return (
    <>
      <EncabezadoPagina titulo="Categorías" descripcion="Organiza los productos del catálogo en categorías.">
        <Button variant="success" onClick={() => setFormulario({ categoria: null })}>
          <i className="bi bi-plus-lg" /> Nueva categoría
        </Button>
      </EncabezadoPagina>

      <Avisos error={error} exito={exito} onCerrarError={() => setError("")} onCerrarExito={() => setExito("")} />

      <Card className="border-0 shadow-sm">
        {cargando ? <Cargando /> : (
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-success">
              <tr>
                <th>Nombre</th>
                <th className="d-none d-md-table-cell">Descripción</th>
                <th className="text-center">Productos</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}<div className="small text-muted">{c.id}</div></td>
                  <td className="d-none d-md-table-cell small">{c.descripcion || "—"}</td>
                  <td className="text-center">{c.cantidadProductos}</td>
                  <td className="text-center text-nowrap">
                    <Button size="sm" variant="outline-primary" className="me-1" onClick={() => setFormulario({ categoria: c })}
                      aria-label={`Editar ${c.nombre}`}>
                      <i className="bi bi-pencil" /> <span className="d-none d-md-inline">Editar</span>
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => setAEliminar(c)} disabled={c.cantidadProductos > 0}
                      title={c.cantidadProductos > 0 ? "Primero mueve o elimina sus productos" : undefined}
                      aria-label={`Eliminar ${c.nombre}`}>
                      <i className="bi bi-trash" /> <span className="d-none d-md-inline">Eliminar</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {formulario && (
        <CategoriaForm key={formulario.categoria?.id ?? "nueva"} show categoria={formulario.categoria}
          onGuardar={guardar} onCancelar={() => setFormulario(null)} />
      )}

      <ConfirmModal
        show={!!aEliminar}
        titulo="Eliminar categoría"
        mensaje={`¿Seguro que quieres eliminar la categoría "${aEliminar?.nombre}"?`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  );
}

export default CategoriasAdmin;
