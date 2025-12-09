namespace AplicativoWebMVC.Models
{
  public class Entrega
  {
    public int IdEntrega {get; set;}
    public int IdVenta {get; set;}
    public required string Direccion {get; set;}
    public required string Estado {get; set;}
    public DateTime FechaProgramada {get; set;}
    public DateTime FechaEntrega {get; set;}
  }
}

