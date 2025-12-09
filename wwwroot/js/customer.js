// ============================================
// CUSTOMER - PANADERÍA ARTESANAL
// ============================================

const logoImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI2Q0Yjg5NiIvPgo8cGF0aCBkPSJNMzIgMTJWMzJMMzggMzgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5jam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPg==';

let cart = [];
let customerOrders = [];
let searchTerm = '';
let selectedCategory = 'Todos';
let currentView = 'shop'; // 'shop' o 'orders'

const products = [
    {
        id: 'P001',
        nombre: 'Pan Artesanal Integral',
        categoria: 'Panes',
        precio: 180000,
        descripcion: 'Pan integral recién horneado con semillas de girasol y lino',
        imagen: 'https://images.unsplash.com/photo-1555932450-31a8aec2adf1?w=400',
        disponible: true
    },
    {
        id: 'P002',
        nombre: 'Croissants de Mantequilla',
        categoria: 'Pastelería',
        precio: 140000,
        descripcion: 'Croissants hojaldrados con mantequilla francesa premium',
        imagen: 'https://images.unsplash.com/photo-1636294153307-e38cbf295a87?w=400',
        disponible: true
    },
    {
        id: 'P003',
        nombre: 'Pan de Masa Madre',
        categoria: 'Panes',
        precio: 260000,
        descripcion: 'Pan de masa madre con fermentación de 24 horas',
        imagen: 'https://images.unsplash.com/photo-1624323209995-b617d99ce390?w=400',
        disponible: true
    },
    {
        id: 'P004',
        nombre: 'Pastel de Chocolate',
        categoria: 'Pasteles',
        precio: 1120000,
        descripcion: 'Delicioso pastel de chocolate con ganache suave',
        imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        disponible: true
    },
    {
        id: 'P005',
        nombre: 'Galletas Surtidas',
        categoria: 'Galletas',
        precio: 340000,
        descripcion: 'Caja de galletas artesanales surtidas (12 unidades)',
        imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
        disponible: true
    },
    {
        id: 'P006',
        nombre: 'Donas Glaseadas',
        categoria: 'Donas',
        precio: 100000,
        descripcion: 'Donas esponjosas con glaseado de colores (unidad)',
        imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
        disponible: true
    }
];

// Inicializar pedidos de ejemplo
customerOrders = [
    {
        id: 'PED-001',
        productos: [
            { nombre: 'Pan Artesanal Integral', cantidad: 2, precio: 180000 },
            { nombre: 'Croissants de Mantequilla', cantidad: 4, precio: 140000 }
        ],
        total: 920000,
        estado: 'Entregado',
        fecha: '2025-12-01',
        hora: '10:30',
        cancelacionSolicitada: false
    },
    {
        id: 'PED-002',
        productos: [
            { nombre: 'Pastel de Chocolate', cantidad: 1, precio: 1120000 }
        ],
        total: 1120000,
        estado: 'En preparación',
        fecha: '2025-12-04',
        hora: '14:15',
        cancelacionSolicitada: false
    }
];

function formatCurrency(amount) {
    return `$ ${amount.toLocaleString('es-CO')} COP`;
}

function getStatusColor(status) {
    switch(status) {
        case 'Pendiente': return 'badge-gray';
        case 'En preparación': return 'badge-primary';
        case 'Listo': return 'badge-blue';
        case 'Entregado': return 'badge-success';
        case 'Cancelado': return 'badge-danger';
        case 'Cancelación en proceso': return 'badge-warning';
        default: return 'badge-gray';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    badge.textContent = totalItems;
    
    if (totalItems === 0) {
        badge.classList.add('hidden');
    } else {
        badge.classList.remove('hidden');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }
    
    updateCartBadge();
    showToast('Producto agregado al carrito');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        renderCart();
    }
}

function renderCart() {
    const body = document.getElementById('cart-body');
    
    if (cart.length === 0) {
        body.innerHTML = `
            <div class="empty-state">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p class="text-muted">Tu carrito está vacío</p>
                <p class="text-sm text-muted mt-2">Agrega productos para comenzar</p>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    body.innerHTML = `
        <div class="space-y-3">
            ${cart.map((item, index) => `
                <div class="flex gap-3 p-3 rounded-lg border" style="background-color: var(--secondary);">
                    <div style="width: 80px; height: 80px; flex-shrink: 0; border-radius: var(--radius); overflow: hidden; background-color: var(--muted);">
                        <img src="${item.imagen}" alt="${item.nombre}" 
                             style="width: 100%; height: 100%; object-fit: cover;" 
                             onerror="this.src='https://via.placeholder.com/80?text=No+Image'" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="truncate">${item.nombre}</h4>
                        <p class="text-sm text-muted">${formatCurrency(item.precio)} c/u</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button class="btn btn-outline btn-sm" onclick="updateQuantity(${index}, -1)" style="width: 28px; height: 28px; padding: 0;">
                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                            <span class="text-sm" style="width: 32px; text-align: center;">${item.cantidad}</span>
                            <button class="btn btn-outline btn-sm" onclick="updateQuantity(${index}, 1)" style="width: 28px; height: 28px; padding: 0;">
                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col items-end justify-between" style="flex-direction: column;">
                        <button class="btn btn-ghost btn-sm" onclick="removeFromCart(${index})" style="color: #ef4444; width: 28px; height: 28px; padding: 0;">
                            <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                        <p class="text-primary">${formatCurrency(item.precio * item.cantidad)}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="pt-4 border-t space-y-3 mt-4">
            <div class="flex justify-between items-center">
                <span>Subtotal:</span>
                <span>${formatCurrency(total)}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
                <span class="text-muted">Envío:</span>
                <span style="color: #166534;">Gratis</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t">
                <span>Total:</span>
                <span class="text-2xl text-primary">${formatCurrency(total)}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="checkout()">
                Confirmar Pedido
            </button>
        </div>
    `;
}

function updateQuantity(index, delta) {
    cart[index].cantidad += delta;
    if (cart[index].cantidad <= 0) {
        cart.splice(index, 1);
    }
    updateCartBadge();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCart();
}

function checkout() {
    if (cart.length === 0) return;
    
    // Crear nuevo pedido
    const newOrder = {
        id: 'PED-' + String(customerOrders.length + 1).padStart(3, '0'),
        productos: cart.map(item => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio
        })),
        total: cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        estado: 'Pendiente',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        cancelacionSolicitada: false
    };
    
    customerOrders.push(newOrder);
    
    showToast('¡Pedido confirmado! Gracias por tu compra');
    cart = [];
    updateCartBadge();
    toggleCart();
}

function switchView(view) {
    currentView = view;
    renderView();
    
    // Actualizar tabs activos
    document.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
    event?.target?.closest('.view-tab')?.classList.add('active');
}

function renderView() {
    const content = document.getElementById('customer-content');
    
    if (currentView === 'shop') {
        renderShop();
    } else if (currentView === 'orders') {
        renderOrders();
    }
}

function renderShop() {
    const content = document.getElementById('customer-content');
    
    // Filtrar productos
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
        return matchesSearch && matchesCategory && product.disponible;
    });
    
    content.innerHTML = `
        <div class="space-y-6">
            <!-- Welcome Banner -->
            <div class="card card-primary shadow-lg">
                <div class="card-content pt-6">
                    <h2 style="color: var(--primary-foreground); margin-bottom: 0.5rem;">
                        ¡Bienvenido, ${JSON.parse(localStorage.getItem('currentUser')).name}!
                    </h2>
                    <p style="color: rgba(10, 14, 26, 0.8);">Explora nuestros productos frescos del día</p>
                </div>
            </div>
            
            <!-- Buscador y Filtros -->
            <div class="card shadow-lg">
                <div class="card-content">
                    <div class="search-filter-container">
                        <!-- Buscador -->
                        <div class="search-box">
                            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input type="text" 
                                   class="input search-input" 
                                   placeholder="Buscar productos..." 
                                   value="${searchTerm}"
                                   oninput="updateSearch(this.value)" />
                        </div>
                        
                        <!-- Filtros de Categoría -->
                        <div class="category-filters">
                            ${['Todos', 'Panes', 'Pastelería', 'Pasteles', 'Galletas', 'Donas'].map(cat => `
                                <button class="category-btn ${selectedCategory === cat ? 'active' : ''}" 
                                        onclick="updateCategory('${cat}')">
                                    ${cat}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Products Grid -->
            ${filteredProducts.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
                    ${filteredProducts.map(product => `
                        <div class="card overflow-hidden shadow-lg transition-all">
                            <div class="aspect-video overflow-hidden" style="background-color: var(--muted);">
                                <img src="${product.imagen}" alt="${product.nombre}" 
                                     class="w-full h-full object-cover product-image" 
                                     onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'" />
                            </div>
                            <div class="card-header pb-3">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <h4 class="card-title">${product.nombre}</h4>
                                        <span class="badge badge-primary mt-1">${product.categoria}</span>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-2xl text-primary">${formatCurrency(product.precio)}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-content">
                                <p class="text-sm text-muted mb-3">${product.descripcion}</p>
                                <button class="btn btn-primary btn-block" onclick="addToCart('${product.id}')">
                                    <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="card shadow-lg">
                    <div class="card-content">
                        <div class="empty-state">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <p class="text-muted">No se encontraron productos</p>
                            <p class="text-sm text-muted mt-2">Intenta con otra búsqueda o categoría</p>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}

function updateSearch(value) {
    searchTerm = value;
    renderShop();
}

function updateCategory(category) {
    selectedCategory = category;
    renderShop();
}

function renderOrders() {
    const content = document.getElementById('customer-content');
    
    content.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="card card-primary shadow-lg">
                <div class="card-content pt-6">
                    <h2 style="color: var(--primary-foreground); margin-bottom: 0.5rem;">
                        Mis Pedidos
                    </h2>
                    <p style="color: rgba(10, 14, 26, 0.8);">Revisa el estado de tus pedidos y solicita cancelaciones</p>
                </div>
            </div>
            
            <!-- Orders List -->
            ${customerOrders.length > 0 ? `
                <div class="space-y-4">
                    ${customerOrders.map(order => `
                        <div class="card shadow-lg">
                            <div class="card-content">
                                <div class="order-header">
                                    <div>
                                        <h4 class="card-title">${order.id}</h4>
                                        <p class="text-sm text-muted">${order.fecha} - ${order.hora}</p>
                                    </div>
                                    <span class="badge ${getStatusColor(order.estado)}">${order.estado}</span>
                                </div>
                                
                                <div class="order-products mt-4">
                                    ${order.productos.map(prod => `
                                        <div class="order-product-item">
                                            <div>
                                                <p>${prod.nombre}</p>
                                                <p class="text-sm text-muted">Cantidad: ${prod.cantidad}</p>
                                            </div>
                                            <p class="text-primary">${formatCurrency(prod.precio * prod.cantidad)}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="order-footer">
                                    <div class="order-total">
                                        <span>Total:</span>
                                        <span class="text-2xl text-primary">${formatCurrency(order.total)}</span>
                                    </div>
                                    
                                    ${order.estado !== 'Entregado' && order.estado !== 'Cancelado' ? `
                                        ${!order.cancelacionSolicitada ? `
                                            <button class="btn btn-outline btn-sm cancel-btn" onclick="requestCancellation('${order.id}')">
                                                Solicitar Cancelación
                                            </button>
                                        ` : `
                                            <div class="cancellation-status">
                                                <svg class="icon icon-sm" style="color: #f59e0b;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                                </svg>
                                                <span class="text-sm" style="color: #f59e0b;">Cancelación en proceso...</span>
                                            </div>
                                        `}
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="card shadow-lg">
                    <div class="card-content">
                        <div class="empty-state">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
                            </svg>
                            <p class="text-muted">No tienes pedidos</p>
                            <p class="text-sm text-muted mt-2">Cuando realices un pedido, aparecerá aquí</p>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}

function requestCancellation(orderId) {
    const order = customerOrders.find(o => o.id === orderId);
    if (order) {
        order.cancelacionSolicitada = true;
        showToast('Solicitud de cancelación enviada. Será procesada en breve.');
        renderOrders();
        
        // Simular procesamiento de cancelación
        setTimeout(() => {
            order.estado = 'Cancelado';
            showToast('Tu pedido ha sido cancelado exitosamente');
            renderOrders();
        }, 3000);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 🔹 Desactivado temporalmente para evitar redirección
    /*
    if (!currentUser || currentUser.role !== 'customer') {
        window.location.href = 'login.html';
        return;
    }
    */

    // Si no hay usuario, simplemente usa datos ficticios para pruebas
    if (!currentUser) {
        localStorage.setItem('currentUser', JSON.stringify({
            name: "Invitado",
            role: "customer"
        }));
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));

    document.getElementById('logo-img').src = logoImage;
    document.getElementById('customer-name').textContent = user.name;

    switchView('shop');
    updateCartBadge();
});