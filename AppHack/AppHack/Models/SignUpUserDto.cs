using System.ComponentModel.DataAnnotations;

namespace AppHack.Models
{
    public class SignUpUserDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required, Compare(nameof(Password), ErrorMessage = "The passwords didn't match.")]
        public string ConfirmPassword { get; set; }
    }
}
