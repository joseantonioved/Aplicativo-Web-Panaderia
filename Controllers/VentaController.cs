using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentaController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public VentaController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Ventas.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var v = await _context.Ventas.FindAsync(id);
            if (v == null) return NotFound();
            return Ok(v);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Venta v)
        {
            _context.Ventas.Add(v);
            await _context.SaveChangesAsync();
            return Ok(v);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Venta v)
        {
            if (id != v.IdVenta) return BadRequest();

            _context.Entry(v).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(v);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var v = await _context.Ventas.FindAsync(id);
            if (v == null) return NotFound();

            _context.Ventas.Remove(v);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
