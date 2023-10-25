using AppointmentSchedulingApi.Configuration;
using AppointmentSchedulingApi.DTO;
using AppointmentSchedulingApi.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AppointmentSchedulingApi.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtBearerTokenSettings _jwtBearerTokenSettings;

        public AuthRepository(SignInManager<IdentityUser> signInManager
         , UserManager<IdentityUser> userManager, IOptions<JwtBearerTokenSettings> jwtTokenOptions)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _jwtBearerTokenSettings = jwtTokenOptions.Value;
        }

        public async Task<UserReplyDTO> Login(LoginCredentials credentials)
        {

            IdentityUser user;

            if ((user = await _userManager.FindByEmailAsync(credentials.Email)) != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user.UserName, credentials.Password,
                credentials.isPersistent = true, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    var token = GenerateToken(user);

                    var userInformation = new UserReplyDTO()
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        Token = token,
                        Errors = null
                    };

                    return userInformation;
                }

                

            }

            return null;

        }


        public async Task<UserReplyDTO> Register(RegisterCredentials registerCredentials)
        {


            var identityUser = new IdentityUser() { UserName = registerCredentials.UserName, Email = registerCredentials.Email };

            var result = await _userManager.CreateAsync(identityUser, registerCredentials.Password);


            if (!result.Succeeded)
            {
                List<IdentityError> errorList = result.Errors.ToList();
                var errors = string.Join(", ", errorList.Select(e => e.Description));

                var userInformationDEFAULT = new UserReplyDTO()
                {

                    UserName = null,
                    Email = null,
                    Token = null,
                    Errors = errors
                };

                return userInformationDEFAULT;
            }

            var user = new UserReplyDTO()
            {
                UserName = identityUser.UserName,
                Email = identityUser.Email,
                Errors = null
            };

            return user;
        }


        private object GenerateToken(IdentityUser identityUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtBearerTokenSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, identityUser.UserName.ToString()),
                    new Claim(ClaimTypes.Email, identityUser.Email)
                }),

                Expires = DateTime.UtcNow.AddMonths(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = _jwtBearerTokenSettings.Audience,
                Issuer = _jwtBearerTokenSettings.Issuer
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }



    }
}
