using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimientoInventarioController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public MovimientoInventarioController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.MovimientosInventario.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var mov = await _context.MovimientosInventario.FindAsync(id);
            if (mov == null) return NotFound();
            return Ok(mov);
        }

        [HttpPost]
        public async Task<IActionResult> Create(MovimientoInventario mov)
        {
            _context.MovimientosInventario.Add(mov);
            await _context.SaveChangesAsync();
            return Ok(mov);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MovimientoInventario mov)
        {
            if (id != mov.IdMovimiento) return BadRequest();

            _context.Entry(mov).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(mov);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var mov = await _context.MovimientosInventario.FindAsync(id);
            if (mov == null) return NotFound();

            _context.MovimientosInventario.Remove(mov);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
