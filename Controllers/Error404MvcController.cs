using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class Error404MvcController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}