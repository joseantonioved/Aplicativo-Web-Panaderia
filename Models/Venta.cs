namespace AplicativoWebMVC.Models
{
  public class Venta
  {
    public int IdVenta {get; set;}
    public int IdCliente {get; set;}
    public int IdUsuarioFechaVenta {get; set;}
    public string MetodoPago {get; set;}
    public string Estado {get; set;}
  }
}