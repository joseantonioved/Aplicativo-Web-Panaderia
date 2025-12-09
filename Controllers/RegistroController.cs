using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;
using AplicativoWebMVC.Models;
using System;
using System.Threading.Tasks;

namespace AplicativoWebMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        private readonly PanaderiaContext _context;

        public RegistroController(PanaderiaContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Registrar([FromBody] Usuario usuario)
        {
            if (usuario == null)
                return BadRequest("Datos inválidos.");

            // Verificar si el correo ya existe
            var existe = await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email);
            if (existe)
                return BadRequest("El correo ya está registrado.");

            try
            {
                // Asignar campos obligatorios
                usuario.Estado = 1;
                usuario.CreadoEn = DateTime.Now;
                usuario.Rol = usuario.Rol ?? "cliente";

                // Guardar en la base de datos
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                // Retornar OK con mensaje y ID
                return Ok(new
                {
                    mensaje = "Usuario registrado correctamente",
                    id = usuario.IdUsuario
                });
            }
            catch (Exception ex)
            {
                // Retornar error 500 con mensaje detallado y InnerException
                return StatusCode(500, new
                {
                    error = ex.Message,
                    inner = ex.InnerException?.Message
                });
            }
        }
    }
}
