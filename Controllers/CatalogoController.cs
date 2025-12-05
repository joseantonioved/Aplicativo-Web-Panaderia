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

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Catalogos.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var c = await _context.Catalogos.FindAsync(id);
            if (c == null) return NotFound();
            return Ok(c);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Catalogo c)
        {
            _context.Catalogos.Add(c);
            await _context.SaveChangesAsync();
            return Ok(c);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Catalogo c)
        {
            if (id != c.IdCatalogo) return BadRequest();

            _context.Entry(c).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(c);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var c = await _context.Catalogos.FindAsync(id);
            if (c == null) return NotFound();

            _context.Catalogos.Remove(c);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
