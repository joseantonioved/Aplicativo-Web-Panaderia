namespace AplicativoWebMVC.Models
{
  public class Venta
  {
    public int IdVenta {get; set;}
    public int IdCliente {get; set;}
    public int IdUsuarioFechaVenta {get; set;}
    public required string MetodoPago {get; set;}
    public required string Estado {get; set;}
  }
}