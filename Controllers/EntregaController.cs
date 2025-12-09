using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntregaController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public EntregaController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Entregas.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entrega = await _context.Entregas.FindAsync(id);
            if (entrega == null) return NotFound();
            return Ok(entrega);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Entrega entrega)
        {
            _context.Entregas.Add(entrega);
            await _context.SaveChangesAsync();
            return Ok(entrega);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Entrega entrega)
        {
            if (id != entrega.IdEntrega) return BadRequest();

            _context.Entry(entrega).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(entrega);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entrega = await _context.Entregas.FindAsync(id);
            if (entrega == null) return NotFound();

            _context.Entregas.Remove(entrega);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
