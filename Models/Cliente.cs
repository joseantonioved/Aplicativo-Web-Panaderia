namespace AplicativoWebMVC.Models
{
  public class Cliente
  {
    public int IdCliente {get; set;}
    public int IdUsuario {get; set;}
    public required string Nombre {get; set;}
    public required string Apellido {get; set;}
    public required string Telefono {get; set;}
    public required string Email {get; set;}
    public required string Direccion {get; set;}
  }
}
