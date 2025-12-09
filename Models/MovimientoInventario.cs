namespace AplicativoWebMVC.Models
{
  public class MovimientoInventario
  {
    public int IdMovimiento {get; set;}
    public int IdProducto {get; set;}
    public required string TipoMovimiento {get; set;}
    public double Cantidad {get; set;}
    public double Precio {get; set;}
    public DateTime FechaMovimiento {get; set;}
    public required string Motivo {get; set;}
    public int IdUsuario {get; set;}
    public int IdCliente {get; set;}
  }
}