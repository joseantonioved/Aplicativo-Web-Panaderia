using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogoController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public CatalogoController(PanaderiaContext context)
        {
            _context = context;
        }

        // GET: api/Catalogo
        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Catalogos.Include(c => c.Categoria).ToListAsync());

        // GET: api/Catalogo/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var c = await _context.Catalogos
                .Include(cat => cat.Categoria)
                .FirstOrDefaultAsync(p => p.IdProducto == id);

            if (c == null) return NotFound();
            return Ok(c);
        }

        // POST: api/Catalogo
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Catalogo c)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // 1️⃣ Guardar producto en Catalogo
            _context.Catalogos.Add(c);
            await _context.SaveChangesAsync(); // Genera IdProducto

            // 2️⃣ Crear Inventario con Stock inicial
            var inventario = new Inventario
            {
                IdProducto = c.IdProducto,
                StockActual = c.Stock, // Stock enviado en el modelo
                Ubicacion = "Bodega principal",
                FechaActualizacion = DateTime.Now
            };

            _context.Inventarios.Add(inventario);
            await _context.SaveChangesAsync();

            return Ok(c);
        }

        // PUT: api/Catalogo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Catalogo c)
        {
            if (id != c.IdProducto) return BadRequest();

            var productoExistente = await _context.Catalogos.FindAsync(id);
            if (productoExistente == null) return NotFound();

            // Actualizar propiedades
            productoExistente.NombreProducto = c.NombreProducto;
            productoExistente.Descripcion = c.Descripcion;
            productoExistente.Precio = c.Precio;
            productoExistente.UnidadMedida = c.UnidadMedida;
            productoExistente.Estado = c.Estado;
            productoExistente.IdCategoria = c.IdCategoria;

            _context.Entry(productoExistente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Actualizar inventario si se envía stock
            if (c.Stock >= 0)
            {
                var inventario = await _context.Inventarios
                    .FirstOrDefaultAsync(i => i.IdProducto == id);

                if (inventario != null)
                {
                    inventario.StockActual = c.Stock;
                    inventario.FechaActualizacion = DateTime.Now;
                    _context.Entry(inventario).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    // Si no existe inventario, crear uno
                    var nuevoInventario = new Inventario
                    {
                        IdProducto = id,
                        StockActual = c.Stock,
                        Ubicacion = "Bodega principal",
                        FechaActualizacion = DateTime.Now
                    };
                    _context.Inventarios.Add(nuevoInventario);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok(productoExistente);
        }

        // DELETE: api/Catalogo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var c = await _context.Catalogos.FindAsync(id);
            if (c == null) return NotFound();

            _context.Catalogos.Remove(c);

            // Eliminar inventario relacionado
            var inventario = await _context.Inventarios
                .FirstOrDefaultAsync(i => i.IdProducto == id);
            if (inventario != null)
                _context.Inventarios.Remove(inventario);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}