using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventarioEntradaController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public InventarioEntradaController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.InventarioEntradas.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entrada = await _context.InventarioEntradas.FindAsync(id);
            if (entrada == null) return NotFound();
            return Ok(entrada);
        }

        [HttpPost]
        public async Task<IActionResult> Create(InventarioEntrada entrada)
        {
            _context.InventarioEntradas.Add(entrada);
            await _context.SaveChangesAsync();
            return Ok(entrada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, InventarioEntrada entrada)
        {
            if (id != entrada.IdEntrada) return BadRequest();

            _context.Entry(entrada).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(entrada);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entrada = await _context.InventarioEntradas.FindAsync(id);
            if (entrada == null) return NotFound();

            _context.InventarioEntradas.Remove(entrada);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
