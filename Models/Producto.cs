public class Producto
{
    public int Id { get; set; }
    public required string Nombre { get; set; }
    public required string Categoria { get; set; }
    public int Precio { get; set; }
    public int Stock { get; set; }
    public required string Descripcion { get; set; }
    public required string Imagen { get; set; }
    public bool Disponible { get; set; }
}
