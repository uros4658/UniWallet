using AppHack.Interfaces;
using AppHack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppHack.Service
{
    public class LoginService : PageModel
    {
        private readonly IFirebaseAuthService _authService;
        [BindProperty]
        public UserDto UserDto { get; set; }
        public LoginService(IFirebaseAuthService authService)
        {
            _authService = authService;
        }
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            var token = await _authService.Login(UserDto.Email, UserDto.Password);
            if (token is not null)
            {
                HttpContext.Session.SetString("token", token);
                return RedirectToPage("/AuthenticatedPage");
            }
            return BadRequest();
        }
    }
}
