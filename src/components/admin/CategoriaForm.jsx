import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Campo from "../Campo";
import { esquemaCategoria } from "../../utils/esquemas";

/**
 * Formulario "Nueva categoría" / "Editar categoría" con React Hook Form + Yup.
 * - useForm guarda los valores (sin un useState por campo) y evita re-renderizar en cada tecla.
 * - yupResolver aplica el esquema de utils/esquemas.js: si no se cumple, no se llama a onGuardar.
 */
function CategoriaForm({ show, categoria, onGuardar, onCancelar }) {
  const [errorServidor, setErrorServidor] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(esquemaCategoria),
    defaultValues: {
      nombre: categoria?.nombre ?? "",
      descripcion: categoria?.descripcion ?? "",
    },
  });

  // Solo se ejecuta si los datos pasaron el esquema (ya vienen sin espacios sobrantes)
  const enviar = async (datos) => {
    setErrorServidor("");
    try {
      await onGuardar(datos);
    } catch (err) {
      setErrorServidor(err.message);
    }
  };

  return (
    <Modal show={show} onHide={onCancelar} centered>
      <Form noValidate onSubmit={handleSubmit(enviar)}>
        <Modal.Header closeButton className="py-2">
          <Modal.Title as="h5">{categoria ? "Editar categoría" : "Nueva categoría"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-2 d-grid gap-2">
          {errorServidor && <Alert variant="danger" className="py-2 mb-0">{errorServidor}</Alert>}
          <Campo id="cat-nombre" etiqueta="Nombre" registro={register("nombre")}
            error={errors.nombre?.message} placeholder="Ej: Hierbas Aromáticas" />
          <Campo id="cat-descripcion" etiqueta="Descripción" as="textarea" rows={3}
            registro={register("descripcion")} error={errors.descripcion?.message} />
          {categoria && (
            <p className="small text-muted mb-0">
              El identificador <code>{categoria.id}</code> no cambia, para que los productos sigan en esta categoría.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button size="sm" variant="secondary" onClick={onCancelar}>Cancelar</Button>
          <Button size="sm" type="submit" variant="success" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CategoriaForm;
