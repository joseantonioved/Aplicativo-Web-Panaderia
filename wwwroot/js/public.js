// ============================================
// INDEX - PANADERÍA ARTESANAL (PÁGINA PÚBLICA)
// ============================================

// Logo en Base64
const logoImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI2Q0Yjg5NiIvPgo8cGF0aCBkPSJNMzIgMTJWMzJMMzggMzgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5jam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPg==';

// Lista de productos
const products = [
    {
        id: 'P001',
        nombre: 'Pan Artesanal Integral',
        categoria: 'Panes',
        precio: 180000,
        descripcion: 'Pan integral recién horneado con semillas de girasol y lino',
        imagen: 'https://images.unsplash.com/photo-1555932450-31a8aec2adf1?w=400'
    },
    {
        id: 'P002',
        nombre: 'Croissants de Mantequilla',
        categoria: 'Pastelería',
        precio: 140000,
        descripcion: 'Croissants hojaldrados con mantequilla francesa premium',
        imagen: 'https://images.unsplash.com/photo-1636294153307-e38cbf295a87?w=400'
    },
    {
        id: 'P003',
        nombre: 'Pan de Masa Madre',
        categoria: 'Panes',
        precio: 260000,
        descripcion: 'Pan de masa madre con fermentación de 24 horas',
        imagen: 'https://images.unsplash.com/photo-1624323209995-b617d99ce390?w=400'
    },
    {
        id: 'P004',
        nombre: 'Pastel de Chocolate',
        categoria: 'Pasteles',
        precio: 1120000,
        descripcion: 'Delicioso pastel de chocolate con ganache suave',
        imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
    },
    {
        id: 'P005',
        nombre: 'Galletas Surtidas',
        categoria: 'Galletas',
        precio: 340000,
        descripcion: 'Caja de galletas artesanales surtidas (12 unidades)',
        imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'
    },
    {
        id: 'P006',
        nombre: 'Donas Glaseadas',
        categoria: 'Donas',
        precio: 100000,
        descripcion: 'Donas esponjosas con glaseado de colores (unidad)',
        imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'
    }
];

// Formateo de moneda
function formatCurrency(amount) {
    return `$ ${amount.toLocaleString('es-CO')} COP`;
}

// Renderizado de productos
function renderProducts() {
    const grid = document.getElementById('products-grid');

    grid.innerHTML = products.map(product => `
        <div class="card overflow-hidden shadow-lg transition-all" style="height: fit-content;">
            <div class="card-overlay">
                <button class="btn btn-primary btn-sm" onclick="redirectToLoginM()">
                    <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Comprar
                </button>
            </div>

            <div style="aspect-ratio: 4/3; background-color: var(--muted); overflow: hidden;">
                <img src="${product.imagen}" alt="${product.nombre}" 
                     class="w-full h-full object-cover product-image" 
                     onerror="this.src='https://via.placeholder.com/300?text=Sin+Imagen'" />
            </div>

            <div class="card-content" style="padding: 0.5rem;">
                <div class="flex flex-col" style="gap: 0.25rem;">
                    <div>
                        <h4 style="font-size: 0.75rem; margin-bottom: 0.25rem; line-height: 1.2;">${product.nombre}</h4>
                        <span class="badge badge-primary" style="font-size: 0.625rem; padding: 0.125rem 0.375rem;">
                            ${product.categoria}
                        </span>
                    </div>
                    <div>
                        <p class="text-primary" style="font-size: 0.875rem; margin-bottom: 0.125rem;">
                            ${formatCurrency(product.precio)}
                        </p>
                        <p class="text-sm text-muted" style="font-size: 0.625rem; line-height: 1.3;">
                            ${product.descripcion}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// REDIRECCIÓN
function redirectToLoginM() {
    window.location.href = '/LoginMvc/Index';
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logo-img').src = logoImage;
    renderProducts();
});