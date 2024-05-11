using System.ComponentModel.DataAnnotations;

namespace AppHack.Models
{
    public class SignUpUserDto
    {
        [Required, EmailAddress]
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string Email { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        [Required]
        public string Password { get; set; }

        [Required, Compare(nameof(Password), ErrorMessage = "The passwords didn't match.")]
        public string ConfirmPassword { get; set; }
    }
}
