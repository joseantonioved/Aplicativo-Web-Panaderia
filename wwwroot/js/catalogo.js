// URL base de la API
const API_URL = "https://localhost:5026/api/Productos"; // ajusté al controlador Productos

// Elementos del DOM
const tablaProductos = document.getElementById("tablaProductosBody");
const formProducto = document.getElementById("formProducto");
const btnNuevoProducto = document.getElementById("btnNuevoProducto");
const catalogoTab = document.getElementById("catalogo-tab");

// Función para obtener todos los productos
async function obtenerProductos() {
    try {
        const res = await fetch(API_URL);
        const productos = await res.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Función para renderizar los productos en la tabla
function mostrarProductos(productos) {
    if (!tablaProductos) return;
    tablaProductos.innerHTML = "";
    productos.forEach(p => {
        tablaProductos.innerHTML += `
            <tr>
                <td>${p.idProducto}</td>
                <td>${p.nombreProducto}</td>
                <td>${p.categoria?.nombreCategoria || ""}</td>
                <td>${p.precio.toFixed(2)}</td>
                <td>${p.unidadMedida}</td>
                <td>${p.estado === 1 ? "Activo" : "Inactivo"}</td>
                <td>
                    <button class="btn btn-sm btn-edit" onclick="editarProducto(${p.idProducto})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${p.idProducto})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Mostrar el formulario
function mostrarFormulario() {
    formProducto.style.display = "block";
}

// Ocultar el formulario
function ocultarFormulario() {
    formProducto.style.display = "none";
    formProducto.reset();
}

// Crear producto
async function crearProducto(producto) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        if (!res.ok) throw new Error("Error al crear el producto");
        obtenerProductos();
        ocultarFormulario();
    } catch (error) {
        console.error(error);
    }
}

// Actualizar producto
async function actualizarProducto(id, producto) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        if (!res.ok) throw new Error("Error al actualizar el producto");
        obtenerProductos();
        ocultarFormulario();
    } catch (error) {
        console.error(error);
    }
}

// Eliminar producto
async function eliminarProducto(id) {
    if (!confirm("¿Deseas eliminar este producto?")) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar el producto");
        obtenerProductos();
    } catch (error) {
        console.error(error);
    }
}

// Editar producto
async function editarProducto(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const producto = await res.json();

        formProducto.idProducto.value = producto.idProducto;
        formProducto.nombreProducto.value = producto.nombreProducto;
        formProducto.idCategoria.value = producto.idCategoria;
        formProducto.descripcion.value = producto.descripcion;
        formProducto.unidadMedida.value = producto.unidadMedida;
        formProducto.precio.value = producto.precio;
        formProducto.estado.value = producto.estado;

        mostrarFormulario();
    } catch (error) {
        console.error("Error al cargar producto:", error);
    }
}

// Botón Nuevo Producto
btnNuevoProducto.addEventListener("click", () => {
    formProducto.reset();
    formProducto.idProducto.value = "";
    mostrarFormulario();
});

// Submit del formulario
formProducto.addEventListener("submit", function (e) {
    e.preventDefault();
    const producto = {
        idCategoria: parseInt(formProducto.idCategoria.value),
        nombreProducto: formProducto.nombreProducto.value,
        descripcion: formProducto.descripcion.value,
        unidadMedida: formProducto.unidadMedida.value,
        precio: parseFloat(formProducto.precio.value),
        estado: parseInt(formProducto.estado.value)
    };

    const id = formProducto.idProducto.value;
    if (id) {
        actualizarProducto(id, producto);
    } else {
        crearProducto(producto);
    }
});

// Inicializar tabla al cargar
obtenerProductos();