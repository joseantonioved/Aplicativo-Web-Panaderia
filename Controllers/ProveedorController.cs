using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProveedorController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public ProveedorController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Proveedores.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var p = await _context.Proveedores.FindAsync(id);
            if (p == null) return NotFound();
            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Proveedor p)
        {
            _context.Proveedores.Add(p);
            await _context.SaveChangesAsync();
            return Ok(p);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Proveedor p)
        {
            if (id != p.IdProveedor) return BadRequest();

            _context.Entry(p).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(p);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var p = await _context.Proveedores.FindAsync(id);
            if (p == null) return NotFound();

            _context.Proveedores.Remove(p);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
