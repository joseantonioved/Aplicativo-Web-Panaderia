using Microsoft.EntityFrameworkCore;
using AplicativoWebMVC.Data;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------
// 1. Agregar conexión a MySQL (Pomelo)
// ---------------------------------------------
builder.Services.AddDbContext<PanaderiaContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// ---------------------------------------------
// 2. Activar MVC (Controladores + Vistas)
// ---------------------------------------------
builder.Services.AddControllersWithViews();

var app = builder.Build();

// ---------------------------------------------
// 3. Configuración de entorno
// ---------------------------------------------
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// ---------------------------------------------
// 4. Archivos estáticos (wwwroot)
// ---------------------------------------------
app.UseStaticFiles();

// ---------------------------------------------
// 5. Routing y autorización
// ---------------------------------------------
app.UseRouting();
app.UseAuthorization();
// ---------------------------------------------
// 6. Ruta por defecto 
// ---------------------------------------------
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=LoginMvc}/{action=Index}/{id?}"
);

// ---------------------------------------------
// Ejecutar app
// ---------------------------------------------
app.Run();
