namespace AplicativoWebMVC.Models
{
  public class Proveedor
  {
    public int IdProveedor {get; set;}
    public required string Nombre {get; set;}
    public required string Telefono {get; set;}
    public required string Email {get; set;}
    public required string Direccion {get; set;}
  }
}