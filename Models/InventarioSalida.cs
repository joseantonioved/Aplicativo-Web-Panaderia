namespace AplicativoWebMVC.Models
{
  public class InventarioSalida
  {
    public int IdSalida {get; set;}
    public int IdMovimiento {get; set;}
    public string Destino {get; set;}
    public string Detalle {get; set;}
    public DateTime FechaSalida {get; set;}
  }
}