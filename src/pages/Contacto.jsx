import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Campo from '../components/Campo';
import { mensajeDeError } from '../api';
import * as contactoService from '../services/contactoService';
import { useAuth } from '../contexto/useAuth';
import { sinErrores, sugerenciasCorreo, validarContacto } from '../utils/validation';
import '../App.css';

const VACIO = { nombre: '', correo: '', comentario: '' };

/** CONTACTO (contacto.html de la plantilla): formulario validado que se guarda en el backend. */
function Contacto() {
    const { usuario } = useAuth();
    const [datos, setDatos] = useState(() =>
        usuario ? { ...VACIO, nombre: `${usuario.nombre} ${usuario.apellidos ?? ''}`.trim(), correo: usuario.email } : VACIO
    );
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
    const campo = (nombre) => ({ nombre, valor: datos[nombre], error: errores[nombre], onChange: cambiar });

    const enviar = async (e) => {
        e.preventDefault();
        const encontrados = validarContacto(datos);
        setErrores(encontrados);
        if (!sinErrores(encontrados)) return;

        setEnviando(true);
        try {
            await contactoService.enviarMensaje({
                nombre: datos.nombre.trim(), correo: datos.correo.trim(), comentario: datos.comentario.trim(),
            });
            setMensaje({ tipo: 'success', texto: '¡Gracias! Recibimos tu mensaje y te responderemos pronto.' });
            setDatos({ ...datos, comentario: '' });
        } catch (err) {
            setMensaje({ tipo: 'danger', texto: mensajeDeError(err, 'No se pudo enviar el mensaje') });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <main>
            <Container className="py-4">
                <Row className="justify-content-center g-4">
                    <Col xs={12} lg={7}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <h1 className="h3 text-center mb-1">Contacto</h1>
                                <p className="text-muted text-center small mb-4">¿Tienes dudas sobre un pedido o un producto? Escríbenos.</p>
                                <Form noValidate onSubmit={enviar} aria-label="Formulario de contacto">
                                    <div className="d-grid gap-3">
                                        <Campo id="contacto-nombre" etiqueta="Nombre completo" autoComplete="name" maxLength={100}
                                            placeholder="Tu nombre" {...campo('nombre')} />
                                        <div>
                                            <Campo id="contacto-correo" etiqueta="Correo" type="email" autoComplete="email" maxLength={100}
                                                list="contacto-correo-sugerencias" placeholder="tucorreo@gmail.com"
                                                ayuda="Correos @duoc.cl, @profesor.duoc.cl o @gmail.com" {...campo('correo')} />
                                            <datalist id="contacto-correo-sugerencias">
                                                {sugerenciasCorreo(datos.correo).map((correo) => <option key={correo} value={correo} />)}
                                            </datalist>
                                        </div>
                                        <Campo id="contacto-comentario" etiqueta="Comentario" as="textarea" rows={5} maxLength={500}
                                            placeholder="Escribe tu mensaje" ayuda={`${datos.comentario.length}/500 caracteres`}
                                            {...campo('comentario')} />
                                    </div>
                                    {mensaje && (
                                        <Alert variant={mensaje.tipo} className="mt-3 mb-0 py-2" role={mensaje.tipo === 'danger' ? 'alert' : 'status'}>
                                            {mensaje.texto}
                                        </Alert>
                                    )}
                                    <div className="text-end mt-3">
                                        <Button type="submit" variant="success" disabled={enviando}>
                                            {enviando ? 'Enviando...' : 'Enviar mensaje'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={4}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <h2 className="h5">Atención al cliente</h2>
                                <p className="small mb-2"><i className="bi bi-geo-alt me-2" />Av. Providencia 1245, Santiago</p>
                                <p className="small mb-2"><i className="bi bi-telephone me-2" />+56 2 2345 6789</p>
                                <p className="small mb-2"><i className="bi bi-envelope me-2" />contacto@huertohogar.cl</p>
                                <p className="small mb-0"><i className="bi bi-clock me-2" />Lunes a sábado, 9:00 a 19:00</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Contacto;
