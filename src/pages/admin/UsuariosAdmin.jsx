import { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import UsuarioTable from "../../components/admin/UsuarioTable";
import UsuarioForm from "../../components/admin/UsuarioForm";
import ConfirmModal from "../../components/admin/ConfirmModal";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import OrdenesTabla from "../../components/OrdenesTabla";
import BoletaModal from "../../components/BoletaModal";
import { useListado } from "../../hooks/useListado";
import * as usuarioService from "../../services/usuarioService";
import * as ordenService from "../../services/ordenService";
import { mensajeDeError } from "../../api";
import { useAuth } from "../../contexto/useAuth";

/** USUARIOS: Mostrar usuarios, Nuevo usuario, Editar usuario e Historial de compras. */
function UsuariosAdmin() {
  const { usuario: actual } = useAuth();
  const { datos: usuarios, cargando, error, setError, recargar } =
    useListado(usuarioService.getUsuarios, "No se pudieron cargar los usuarios");
  const [exito, setExito] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [formulario, setFormulario] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);

  // Historial de compras: { usuario, ordenes } del usuario seleccionado
  const [historial, setHistorial] = useState(null);
  const [boleta, setBoleta] = useState(null);

  const guardar = async (datos) => {
    const editando = formulario?.usuario;
    try {
      if (editando) await usuarioService.actualizarUsuario(editando.id, datos);
      else await usuarioService.crearUsuario(datos);
    } catch (err) {
      throw new Error(mensajeDeError(err, "No se pudo guardar el usuario"), { cause: err });
    }
    setFormulario(null);
    setExito(editando ? "Usuario actualizado" : "Usuario creado");
    recargar();
  };

  const confirmarEliminar = async () => {
    try {
      await usuarioService.eliminarUsuario(aEliminar.id);
      setExito(`Usuario "${aEliminar.nombre}" eliminado`);
      recargar();
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo eliminar el usuario"));
    } finally {
      setAEliminar(null);
    }
  };

  const verHistorial = async (u) => {
    try {
      setHistorial({ usuario: u, ordenes: await ordenService.getOrdenesDeUsuario(u.email) });
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo cargar el historial"));
    }
  };

  const visibles = filtroRol ? usuarios.filter((u) => u.rol === filtroRol) : usuarios;

  return (
    <>
      <EncabezadoPagina titulo="Usuarios" descripcion="Administra las cuentas, asigna roles y revisa el historial de compras.">
        <Button variant="success" className="text-nowrap" onClick={() => setFormulario({ usuario: null })}>
          <i className="bi bi-person-plus" /> Nuevo usuario
        </Button>
      </EncabezadoPagina>

      <Form.Select className="w-auto mb-3" aria-label="Filtrar por rol" value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
        <option value="">Todos los roles</option>
        <option value="CLIENTE">Clientes</option>
        <option value="ADMIN">Administradores</option>
      </Form.Select>

      <Avisos error={error} exito={exito} onCerrarError={() => setError("")} onCerrarExito={() => setExito("")} />

      <Card className="border-0 shadow-sm">
        {cargando ? <Cargando /> : (
          <UsuarioTable usuarios={visibles} idUsuarioActual={actual?.id}
            onEditar={(u) => setFormulario({ usuario: u })} onEliminar={setAEliminar} onHistorial={verHistorial} />
        )}
      </Card>

      {formulario && (
        <UsuarioForm key={formulario.usuario?.id ?? "nuevo"} show usuario={formulario.usuario}
          esUsuarioActual={formulario.usuario?.id === actual?.id}
          onGuardar={guardar} onCancelar={() => setFormulario(null)} />
      )}

      {/* HISTORIAL DE COMPRAS (reutiliza OrdenesTabla y BoletaModal) */}
      <Modal show={Boolean(historial) && !boleta} onHide={() => setHistorial(null)} size="lg" centered scrollable>
        <Modal.Header closeButton className="py-2">
          <Modal.Title as="h5">Historial de compras · {historial?.usuario.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {historial && (
            <OrdenesTabla ordenes={historial.ordenes} mostrarCliente={false}
              onVerBoleta={setBoleta} vacio="Este usuario todavía no tiene compras." />
          )}
        </Modal.Body>
      </Modal>
      <BoletaModal orden={boleta} onCerrar={() => setBoleta(null)} />

      <ConfirmModal
        show={!!aEliminar}
        titulo="Eliminar usuario"
        mensaje={`¿Seguro que quieres eliminar a "${aEliminar?.nombre}"?`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setAEliminar(null)}
      />
    </>
  );
}

export default UsuariosAdmin;
