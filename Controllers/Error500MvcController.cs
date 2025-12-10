using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class Error500MvcController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}