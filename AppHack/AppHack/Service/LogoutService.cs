using AppHack.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppHack.Service
{
    public class LogoutService : PageModel
    {
        private readonly IFirebaseAuthService _firebaseAuthService;
        public LogoutService(IFirebaseAuthService firebaseAuthService)
        {
            _firebaseAuthService = firebaseAuthService;
        }
        public IActionResult OnGet()
        {
            _firebaseAuthService.SignOut();
            HttpContext.Session.Remove("token");
            return Page();
        }
    }
}
