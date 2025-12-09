namespace AplicativoWebMVC.Models
{
  public class Inventario
  {
    public int IdInventario {get; set;}
    public int IdProducto {get; set;} 
    public double StockActual {get; set;}
    public required string Ubicacion {get; set;}
    public DateTime FechaActualizacion {get; set;} 
  }
}