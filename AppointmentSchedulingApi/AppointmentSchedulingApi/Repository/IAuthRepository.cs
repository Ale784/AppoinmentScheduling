using AppointmentSchedulingApi.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApi.Repository
{
    public interface IAuthRepository
    {

        Task<IdentityUser> Login(LoginCredentials credentials);
        Task<IdentityResult> Register(RegisterCredentials registerCredentials);
        Task<IActionResult> Test(string name,  string email, string password);

    }
}
