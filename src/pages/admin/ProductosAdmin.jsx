import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import ProductoTable from "../../components/admin/ProductoTable";
import ProductoForm from "../../components/admin/ProductoForm";
import ConfirmModal from "../../components/admin/ConfirmModal";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import { useListado } from "../../hooks/useListado";
import * as productoService from "../../services/productoService";
import * as categoriaService from "../../services/categoriaService";
import { mensajeDeError } from "../../api";
import { STOCK_BAJO } from "../../utils/producto";

/**
 * PRODUCTOS: Mostrar productos, Nuevo producto, Editar producto y Eliminar.
 * Con soloCriticos=true es la página "Listado de productos críticos" (stock bajo):
 * se reutiliza el mismo componente en vez de crear otro casi igual.
 */
function ProductosAdmin({ soloCriticos = false }) {
  const productosListado = useListado(productoService.getProductos, "No se pudieron cargar los productos");
  const { datos: categorias } = useListado(categoriaService.getCategorias);
  const { datos: productos, cargando, error, setError, recargar } = productosListado;

  const [exito, setExito] = useState("");
  const [filtro, setFiltro] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [searchParams] = useSearchParams();
  const [codigoYaAbierto, setCodigoYaAbierto] = useState(null);

  // formulario: null = cerrado | { producto: null } = nuevo | { producto } = editar
  const [formulario, setFormulario] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);

  // Desde el dashboard o la tienda se puede llegar con ?editar=FR001: abre ese producto.
  // Se resuelve durante el render (sin useEffect) apenas llegan los productos.
  const codigoAEditar = searchParams.get("editar");
  if (codigoAEditar && productos.length > 0 && codigoYaAbierto !== codigoAEditar) {
    setCodigoYaAbierto(codigoAEditar);
    const producto = productos.find((p) => p.codigo.toUpperCase() === codigoAEditar.toUpperCase());
    if (producto) setFormulario({ producto });
  }

  const guardar = async (datos) => {
    const editando = formulario?.producto;
    try {
      if (editando) await productoService.actualizarProducto(editando.id, datos);
      else await productoService.crearProducto(datos);
    } catch (err) {
      throw new Error(mensajeDeError(err, "No se pudo guardar el producto"), { cause: err });
    }
    setFormulario(null);
    setExito(editando ? "Producto actualizado" : "Producto creado");
    recargar();
  };

  const confirmarEliminar = async () => {
    try {
      await productoService.eliminarProducto(aEliminar.id);
      setExito(`"${aEliminar.nombre}" eliminado`);
      recargar();
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo eliminar el producto"));
    } finally {
      setAEliminar(null);
    }
  };

  const texto = busqueda.trim().toLowerCase();
  const visibles = productos.filter((p) =>
    (!soloCriticos || p.stock <= STOCK_BAJO) &&
    (!filtro || p.categoria === filtro) &&
    (!texto || p.nombre.toLowerCase().includes(texto) || p.codigo.toLowerCase().includes(texto))
  );

  return (
    <>
      <EncabezadoPagina
        titulo={soloCriticos ? "Productos críticos" : "Productos"}
        descripcion={soloCriticos
          ? `Productos con ${STOCK_BAJO} unidades o menos de stock. Edítalos para reponer.`
          : "Crea, edita y elimina los productos del catálogo, y define sus ofertas."}
      >
        {soloCriticos ? (
          <Button as={Link} to="/admin/productos" variant="outline-success">Ver todos</Button>
        ) : (
          <Button as={Link} to="/admin/productos/criticos" variant="outline-warning">
            <i className="bi bi-exclamation-triangle" /> Críticos
          </Button>
        )}
        <Button variant="success" className="text-nowrap" onClick={() => setFormulario({ producto: null })}>
          <i className="bi bi-plus-lg" /> Nuevo producto
        </Button>
      </EncabezadoPagina>

      <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
        <Form.Control type="search" placeholder="Buscar por nombre o código" aria-label="Buscar producto"
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <Form.Select aria-label="Filtrar por categoría" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </Form.Select>
      </div>

      <Avisos error={error} exito={exito} onCerrarError={() => setError("")} onCerrarExito={() => setExito("")} />

      <Card className="border-0 shadow-sm">
        {cargando ? (
          <Cargando />
        ) : (
          <ProductoTable productos={visibles} categorias={categorias}
            onEditar={(p) => setFormulario({ producto: p })} onEliminar={setAEliminar} />
        )}
      </Card>

      {formulario && (
        <ProductoForm key={formulario.producto?.id ?? "nuevo"} show producto={formulario.producto}
          categorias={categorias} onGuardar={guardar} onCancelar={() => setFormulario(null)} />
      )}

      <ConfirmModal
        show={!!aEliminar}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que quieres eliminar "${aEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  );
}

export default ProductosAdmin;
