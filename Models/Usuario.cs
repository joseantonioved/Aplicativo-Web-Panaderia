namespace AplicativoWebMVC.Models
{
  public class Usuario
  {
    public int IdUsuario {get; set;}
    public string NombreUsuario {get; set;}
    public string Contrasena {get; set;}
    public string Email {get; set;}
    public string Rol {get; set;}
    public int Estado {get; set;}
    public DateTime CreadoEn {get; set;}
    public string Telefono { get; set; }
  }
}