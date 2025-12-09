using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacturaDetalleController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public FacturaDetalleController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.Set<FacturaDetalle>().ToListAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var detalle = await _context.Set<FacturaDetalle>().FindAsync(id);
            if (detalle == null) return NotFound();
            return Ok(detalle);
        }

        [HttpPost]
        public async Task<IActionResult> Create(FacturaDetalle detalle)
        {
            await _context.Set<FacturaDetalle>().AddAsync(detalle);
            await _context.SaveChangesAsync();
            return Ok(detalle);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, FacturaDetalle detalle)
        {
            var exist = await _context.Set<FacturaDetalle>().FindAsync(id);
            if (exist == null) return NotFound();

            _context.Entry(exist).CurrentValues.SetValues(detalle);
            await _context.SaveChangesAsync();
            return Ok(exist);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exist = await _context.Set<FacturaDetalle>().FindAsync(id);
            if (exist == null) return NotFound();

            _context.Set<FacturaDetalle>().Remove(exist);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
