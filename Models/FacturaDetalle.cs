namespace AplicativoWebMVC.Models
{
  public class FacturaDetalle
  {
    public int IdDetalle {get; set;}
    public int IdFactura {get; set;}
    public required string Descripcion {get; set;}
    public double Monto {get; set;}
  }
}