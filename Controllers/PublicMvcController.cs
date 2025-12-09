using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class PublicMvcController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        
    }
}