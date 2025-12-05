using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventarioController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public InventarioController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Inventarios.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var inv = await _context.Inventarios.FindAsync(id);
            if (inv == null) return NotFound();
            return Ok(inv);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Inventario inv)
        {
            _context.Inventarios.Add(inv);
            await _context.SaveChangesAsync();
            return Ok(inv);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Inventario inv)
        {
            if (id != inv.IdInventario) return BadRequest();

            _context.Entry(inv).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(inv);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var inv = await _context.Inventarios.FindAsync(id);
            if (inv == null) return NotFound();

            _context.Inventarios.Remove(inv);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
