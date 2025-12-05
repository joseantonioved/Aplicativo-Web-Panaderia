using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;

namespace AplicativoWebMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public UsuarioController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Usuarios.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var u = await _context.Usuarios.FindAsync(id);
            if (u == null) return NotFound();
            return Ok(u);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Usuario u)
        {
            _context.Usuarios.Add(u);
            await _context.SaveChangesAsync();
            return Ok(u);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Usuario u)
        {
            if (id != u.IdUsuario) return BadRequest();

            _context.Entry(u).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(u);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var u = await _context.Usuarios.FindAsync(id);
            if (u == null) return NotFound();

            _context.Usuarios.Remove(u);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
