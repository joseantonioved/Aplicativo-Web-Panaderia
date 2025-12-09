using Microsoft.AspNetCore.Mvc;

namespace AplicativoWebMVC.Controllers
{
    public class CustomerMvcController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        
    }
}
