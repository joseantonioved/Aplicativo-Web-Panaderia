namespace AplicativoWebMVC.Models
{
  public class InventarioEntrada
  {
    public int IdEntrada {get; set;}
    public int IdMovimiento {get; set;}
    public required string Detalle {get; set;}
    public DateTime FechaEntrada {get; set;}   
  }
 }
