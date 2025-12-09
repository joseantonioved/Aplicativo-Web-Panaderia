namespace AplicativoWebMVC.Models
{
  public class Catalogo
  {

    public int IdCatalogo {get; set;}
    public int IdProducto {get; set;}
    public int IdCategoria {get; set;}
    public required string NombreProducto {get; set;}
    public required string Descripcion {get; set;}
    public required string UnidadMedida {get; set;}
    public double Precio {get; set;}
    public required string Estado {get; set;}
  }
}