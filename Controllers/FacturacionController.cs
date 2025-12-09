using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacturacionController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public FacturacionController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Facturaciones.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var factura = await _context.Facturaciones.FindAsync(id);
            if (factura == null) return NotFound();
            return Ok(factura);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Facturacion factura)
        {
            _context.Facturaciones.Add(factura);
            await _context.SaveChangesAsync();
            return Ok(factura);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Facturacion factura)
        {
            if (id != factura.IdFacturacion) return BadRequest();

            _context.Entry(factura).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(factura);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var factura = await _context.Facturaciones.FindAsync(id);
            if (factura == null) return NotFound();

            _context.Facturaciones.Remove(factura);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
