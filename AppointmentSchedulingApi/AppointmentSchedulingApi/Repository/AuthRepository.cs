using AppointmentSchedulingApi.DTO;
using AppointmentSchedulingApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApi.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthRepository(ApplicationDbContext context, SignInManager<IdentityUser> signInManager
         , UserManager<IdentityUser> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager; 
        }



        public async Task<IdentityUser> Login(LoginCredentials credentials)
        {

            IdentityUser user;

            if ((user = await _userManager.FindByEmailAsync(credentials.Email)) != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user.UserName, credentials.Password,
                credentials.isPersistent = true, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    return user;
                }

            }
            return null;
        }


        public async Task<IdentityResult> Register(RegisterCredentials registerCredentials)
        {


            var identityUser = new IdentityUser() { UserName = registerCredentials.UserName, Email = registerCredentials.Email };

            var result = await _userManager.CreateAsync(identityUser, registerCredentials.Password);

            return result;

        }
















        public Task<IActionResult> Test(string name, string email, string password)
        {
            throw new NotImplementedException();
        }




    }
}
