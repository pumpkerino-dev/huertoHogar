package com.huertohogar.backend.config;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.huertohogar.backend.model.Categoria;
import com.huertohogar.backend.model.ClienteOrden;
import com.huertohogar.backend.model.ItemOrden;
import com.huertohogar.backend.model.Orden;
import com.huertohogar.backend.model.Producto;
import com.huertohogar.backend.model.Rol;
import com.huertohogar.backend.model.Usuario;
import com.huertohogar.backend.repository.CategoriaRepository;
import com.huertohogar.backend.repository.OrdenRepository;
import com.huertohogar.backend.repository.ProductoRepository;
import com.huertohogar.backend.repository.UsuarioRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final OrdenRepository ordenRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    public DataInitializer(UsuarioRepository usuarioRepository, ProductoRepository productoRepository,
                           CategoriaRepository categoriaRepository, OrdenRepository ordenRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
        this.ordenRepository = ordenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        cargarCategorias();
        cargarUsuarios();
        cargarProductos();
        cargarOrdenes();
    }

    private void cargarCategorias() {
        if (categoriaRepository.count() > 0) {
            return;
        }
        categoriaRepository.saveAll(List.of(
            categoria("frutas", "Frutas Frescas", "Frutas cultivadas y cosechadas en su punto óptimo de madurez."),
            categoria("verduras", "Verduras Orgánicas", "Verduras cultivadas sin pesticidas ni químicos."),
            categoria("organicos", "Productos Orgánicos", "Aceites, miel, granos y semillas procesados de manera responsable."),
            categoria("lacteos", "Productos Lácteos", "Leches, yogures y derivados de granjas locales.")
        ));
    }

    private void cargarUsuarios() {
        if (usuarioRepository.countByRol(Rol.ADMIN) == 0) {
            usuarioRepository.save(usuario("Administrador HuertoHogar", adminEmail, adminPassword,
                    "+56 9 1111 2222", "Av. Providencia 1234, Santiago", Rol.ADMIN));
            System.out.println("====== USUARIO ADMIN CREADO: " + adminEmail + " ======");
        }
        if (!usuarioRepository.existsByEmailIgnoreCase("cliente@huertohogar.cl")) {
            usuarioRepository.save(usuario("María González Silva", "cliente@huertohogar.cl", "Cliente123",
                    "+56 9 8765 4321", "Av. Providencia 1245, Apt 402, Santiago", Rol.CLIENTE));
        }
    }

    private void cargarProductos() {
        if (productoRepository.count() > 0) {
            return;
        }
        productoRepository.saveAll(List.of(
            producto("VR002", "Espinacas Frescas", "verduras", 700, null,
                "bolsa de 500 g", 80, "", "/img/prod-thumb-1C.png",
                "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.",
                "Espinacas frescas cultivadas bajo prácticas orgánicas.", "⭐⭐⭐⭐☆", "", "",
                "{\"thumbnails\":[\"/img/prod-thumb-2C.png\",\"/img/prod-thumb-3C.png\",\"/img/prod-thumb-4C.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"VR002\"},{\"label\":\"Presentación\",\"value\":\"500 g\"}],\"ecoTitle\":\"Producto Orgánico\",\"ecoDescription\":\"Cultivadas bajo prácticas orgánicas para garantizar su calidad.\",\"unit\":\"Bolsa\",\"unitPlural\":\"Bolsas\"}"),
            producto("PL001", "Leche Entera", "lacteos", 950, 1250,
                "1 L", 60, "OSORNO", "/img/prod-thumb-1A.png",
                "Leche entera de origen local, seleccionada por su frescura y calidad. Un producto tradicional ideal para acompañar desayunos, preparaciones y el consumo diario de toda la familia.",
                "Leche fresca de productores locales de Osorno.", "⭐⭐⭐⭐⭐", "osorno", "",
                "{\"thumbnails\":[\"/img/prod-thumb-2A.png\",\"/img/prod-thumb-3A.png\",\"/img/prod-thumb-4A.png\"],\"infoTitle\":\"INFORMACIÓN DE ORIGEN\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"PL001\"},{\"label\":\"Origen\",\"value\":\"Osorno, Chile\"},{\"label\":\"Presentación\",\"value\":\"1 L\"}],\"ecoTitle\":\"Producción Local\",\"ecoDescription\":\"Producto proveniente de productores locales de la zona de Osorno.\",\"unit\":\"Litro\",\"unitPlural\":\"Litros\"}"),
            producto("FR001", "Manzanas Fuji", "frutas", 900, 1200,
                "kg", 150, "VALLE DEL MAULE", "/img/prod-thumb-1.png",
                "Nuestras manzanas Fuji son cultivadas con extremo cuidado en las tierras del Valle del Maule. Destacan por su característico dulzor natural, una textura crujiente insuperable y una frescura garantizada por la cosecha diaria.",
                "Manzanas crujientes y dulces del Valle del Maule.", "⭐⭐⭐⭐⭐", "maule", "",
                "{\"thumbnails\":[\"/img/prod-thumb-2.png\",\"/img/prod-thumb-3.png\",\"/img/prod-thumb-4.png\"],\"infoTitle\":\"INFORMACIÓN DE ORIGEN\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"FR001\"},{\"label\":\"Origen\",\"value\":\"Valle del Maule, Maule, Chile\"},{\"label\":\"Prácticas Sostenibles\",\"value\":\"Sin Pesticidas Químicos\",\"className\":\"text-green\"}],\"ecoTitle\":\"Huella de Carbono Reducida\",\"ecoDescription\":\"Al comprar este producto local reduces 2.5 kg de emisiones de CO2.\",\"unit\":\"Kilo\",\"unitPlural\":\"Kilos\"}"),
            producto("PO001", "Miel Orgánica", "organicos", 5000, null,
                "frasco de 500 g", 50, "APICULTORES LOCALES", "/img/prod-thumb-1B.png",
                "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.",
                "Miel pura producida por apicultores locales.", "⭐⭐⭐⭐☆", "apicultores-locales", "organica",
                "{\"thumbnails\":[\"/img/prod-thumb-2B.png\",\"/img/prod-thumb-3B.png\",\"/img/prod-thumb-4B.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"PO001\"},{\"label\":\"Origen\",\"value\":\"Apicultores locales\"}],\"ecoTitle\":\"Producción Local\",\"ecoDescription\":\"Miel producida por apicultores locales mediante prácticas responsables.\",\"unit\":\"Frasco\",\"unitPlural\":\"Frascos\"}"),
            producto("FR002", "Naranjas Valencia", "frutas", 1000, null,
                "kg", 200, "", "/img/prod-thumb-1H.png",
                "Naranjas Valencia jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.",
                "Naranjas jugosas y ricas en vitamina C.", "⭐⭐⭐⭐☆", "", "",
                "{\"thumbnails\":[\"/img/prod-thumb-2H.png\",\"/img/prod-thumb-3H.png\",\"/img/prod-thumb-4H.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"FR002\"},{\"label\":\"Prácticas Sostenibles\",\"value\":\"Producción responsable\",\"className\":\"text-green\"}],\"ecoTitle\":\"Producto Fresco\",\"ecoDescription\":\"Producto seleccionado para mantener su frescura y calidad.\",\"unit\":\"Kilo\",\"unitPlural\":\"Kilos\"}"),
            producto("VR003", "Pimientos Tricolores", "verduras", 1500, null,
                "kg", 120, "", "/img/prod-thumb-1G.png",
                "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, añaden un toque vibrante y saludable a cualquier receta.",
                "Pimientos rojos, amarillos y verdes ricos en vitaminas.", "⭐⭐⭐⭐⭐", "", "",
                "{\"thumbnails\":[\"/img/prod-thumb-2G.png\",\"/img/prod-thumb-3G.png\",\"/img/prod-thumb-4G.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"VR003\"},{\"label\":\"Variedades\",\"value\":\"Rojo, amarillo y verde\"}],\"ecoTitle\":\"Producto Fresco\",\"ecoDescription\":\"Seleccionado para mantener su frescura y calidad.\",\"unit\":\"Kilo\",\"unitPlural\":\"Kilos\"}"),
            producto("FR003", "Plátanos Cavendish", "frutas", 800, null,
                "kg", 250, "", "/img/prod-thumb-2F.png",
                "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
                "Plátanos dulces y ricos en potasio, ideales como snack.", "⭐⭐⭐⭐☆", "", "",
                "{\"thumbnails\":[\"/img/prod-thumb-1F.png\",\"/img/prod-thumb-3F.png\",\"/img/prod-thumb-4F.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"FR003\"},{\"label\":\"Prácticas Sostenibles\",\"value\":\"Producción responsable\",\"className\":\"text-green\"}],\"ecoTitle\":\"Producto Fresco\",\"ecoDescription\":\"Seleccionado para mantener su frescura y calidad.\",\"unit\":\"Kilo\",\"unitPlural\":\"Kilos\"}"),
            producto("PO003", "Quinua Orgánica", "organicos", 3500, null,
                "bolsa de 500 g", 60, "", "/img/prod-thumb-1E.png",
                "Quinua orgánica seleccionada por su calidad y valor nutricional. Ideal para acompañamientos, ensaladas y preparaciones saludables, ofreciendo una alternativa versátil para una alimentación equilibrada.",
                "Quinua seleccionada para una alimentación saludable.", "⭐⭐⭐⭐☆", "", "organica",
                "{\"thumbnails\":[\"/img/prod-thumb-2E.png\",\"/img/prod-thumb-3E.png\",\"/img/prod-thumb-4E.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"PO003\"},{\"label\":\"Presentación\",\"value\":\"500 g\"}],\"ecoTitle\":\"Producto Orgánico\",\"ecoDescription\":\"Seleccionado mediante prácticas responsables para mantener su calidad natural.\",\"unit\":\"Bolsa\",\"unitPlural\":\"Bolsas\"}"),
            producto("VR001", "Zanahorias Orgánicas", "verduras", 900, null,
                "kg", 100, "REGIÓN DE O'HIGGINS", "/img/prod-thumb-4D.png",
                "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.",
                "Zanahorias crujientes cultivadas sin pesticidas.", "⭐⭐⭐⭐⭐", "ohiggins", "sin-pesticidas",
                "{\"thumbnails\":[\"/img/prod-thumb-2D.png\",\"/img/prod-thumb-3D.png\",\"/img/prod-thumb-1D.png\"],\"infoTitle\":\"INFORMACIÓN DEL PRODUCTO\",\"infoRows\":[{\"label\":\"Código\",\"value\":\"VR001\"},{\"label\":\"Prácticas Sostenibles\",\"value\":\"Sin pesticidas químicos\",\"className\":\"text-green\"}],\"ecoTitle\":\"Producto Orgánico\",\"ecoDescription\":\"Cultivadas sin pesticidas químicos para conservar su calidad natural.\",\"unit\":\"Kilo\",\"unitPlural\":\"Kilos\"}")
        ));
        System.out.println("====== PRODUCTOS INICIALES CARGADOS ======");
    }

    private void cargarOrdenes() {
        if (ordenRepository.count() > 0) {
            return;
        }
        Usuario cliente = usuarioRepository.findByEmailIgnoreCase("cliente@huertohogar.cl").orElse(null);
        if (cliente == null) {
            return;
        }
        ClienteOrden datosCliente = new ClienteOrden(cliente.getId(), cliente.getNombre(), cliente.getEmail());
        ordenRepository.saveAll(List.of(
            orden("HH-1001", LocalDateTime.of(2026, 10, 28, 10, 15), datosCliente, List.of(
                    item("FR001", "Manzanas Fuji", 2, 900, "frutas"),
                    item("PO001", "Miel Orgánica", 1, 5000, "organicos"))),
            orden("HH-1002", LocalDateTime.of(2026, 10, 30, 18, 40), datosCliente, List.of(
                    item("PL001", "Leche Entera", 3, 950, "lacteos"),
                    item("VR002", "Espinacas Frescas", 2, 700, "verduras")))
        ));
    }

    private Categoria categoria(String id, String nombre, String descripcion) {
        Categoria c = new Categoria();
        c.setId(id);
        c.setNombre(nombre);
        c.setDescripcion(descripcion);
        return c;
    }

    private Usuario usuario(String nombre, String email, String password, String telefono, String direccion, Rol rol) {
        Usuario u = new Usuario();
        u.setNombre(nombre);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(password));
        u.setTelefono(telefono);
        u.setDireccion(direccion);
        u.setRol(rol);
        return u;
    }

    private Producto producto(String codigo, String nombre, String categoria, int precio, Integer precioOriginal,
                              String unidad, int stock, String origen, String imagen, String descripcion,
                              String descripcionCorta, String estrellas, String origenFiltro, String certificacion,
                              String detalle) {
        Producto p = new Producto();
        p.setCodigo(codigo);
        p.setNombre(nombre);
        p.setCategoria(categoria);
        p.setPrecio(precio);
        p.setPrecioOriginal(precioOriginal);
        p.setUnidad(unidad);
        p.setStock(stock);
        p.setOrigen(origen);
        p.setImagen(imagen);
        p.setDescripcion(descripcion);
        p.setDescripcionCorta(descripcionCorta);
        p.setEstrellas(estrellas);
        p.setOrigenFiltro(origenFiltro);
        p.setCertificacion(certificacion);
        p.setDetalle(detalle);
        return p;
    }

    private ItemOrden item(String codigo, String nombre, int cantidad, int precioUnitario, String categoria) {
        return new ItemOrden(null, codigo, nombre, cantidad, precioUnitario, categoria);
    }

    private Orden orden(String id, LocalDateTime fecha, ClienteOrden cliente, List<ItemOrden> items) {
        Orden o = new Orden();
        o.setId(id);
        o.setFecha(fecha);
        o.setEstado("PAGADA");
        o.setFechaEntrega("");
        o.setCliente(cliente);
        o.setItems(new ArrayList<>(items));
        o.setTotal(items.stream().mapToInt(i -> i.getPrecioUnitario() * i.getCantidad()).sum());
        return o;
    }
}
