using AppHack.Interfaces;
using AppHack.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppHack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IFirebaseAuthService _authService;

        public AuthController(IFirebaseAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpUserDto userDto)
        {
            var token = await _authService.SignUp(userDto.Email, userDto.Password);
            if (token is not null)
            {
                return Ok(new { token = token });
            }
            return BadRequest("Registration failed");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            var token = await _authService.Login(userDto.Email, userDto.Password);
            if (token is not null)
            {
                return Ok(new { token = token });
            }
            return Unauthorized();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _authService.SignOut();
            return Ok();
        }
    }
}
