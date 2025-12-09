using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventarioSalidaController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public InventarioSalidaController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.InventarioSalidas.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var salida = await _context.InventarioSalidas.FindAsync(id);
            if (salida == null) return NotFound();
            return Ok(salida);
        }

        [HttpPost]
        public async Task<IActionResult> Create(InventarioSalida salida)
        {
            _context.InventarioSalidas.Add(salida);
            await _context.SaveChangesAsync();
            return Ok(salida);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, InventarioSalida salida)
        {
            if (id != salida.IdSalida) return BadRequest();

            _context.Entry(salida).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(salida);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var salida = await _context.InventarioSalidas.FindAsync(id);
            if (salida == null) return NotFound();

            _context.InventarioSalidas.Remove(salida);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
