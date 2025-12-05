using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class LoginMvcController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
