namespace AplicativoWebMVC.Models
{
  public class Catalogo
  {

    public int IdCatalogo {get; set;}
    public int IdProducto {get; set;}
    public int IdCategoria {get; set;}
    public string NombreProducto {get; set;}
    public string Descripcion {get; set;}
    public string UnidadMedida {get; set;}
    public double Precio {get; set;}
    public string Estado {get; set;}
  }
}