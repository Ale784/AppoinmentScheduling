using System.ComponentModel.DataAnnotations;

namespace AppointmentSchedulingApi.DTO
{
    public class LoginCredentials
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool isPersistent { get; set; }

    }
}
