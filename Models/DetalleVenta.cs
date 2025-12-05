namespace AplicativoWebMVC.Models
{
  public class DetalleVenta
  {
    public int IdDetalle {get; set;}
    public int IdVenta {get; set;}
    public int IdProducto {get; set;}
    public double Cantidad {get; set;}
    public double PrecioUnitario {get; set;}
    public double Subtotal {get; set;}
  }
}