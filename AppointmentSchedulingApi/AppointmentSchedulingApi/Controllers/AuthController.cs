using AppointmentSchedulingApi.Configuration;
using AppointmentSchedulingApi.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow.PointsToAnalysis;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Collections.Generic;
using AppointmentSchedulingApi.Repository;
using AppointmentSchedulingApi.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;

namespace AppointmentSchedulingApi.Controllers
{
    [Route("/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtBearerTokenSettings _jwtBearerTokenSettings;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        private readonly IAuthRepository _repository;

        public AuthController(SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager, IOptions<JwtBearerTokenSettings> jwtTokenOptions,
            IAuthRepository repository)
        {
            _jwtBearerTokenSettings = jwtTokenOptions.Value;
            _signInManager = signInManager;
            _userManager = userManager;
            _repository = repository;
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCredentials registerCredentials)
        {

            if (!ModelState.IsValid)
            {
                var error = ModelState.Values
                   .SelectMany(x => x.Errors)
                   .Select(err => err.ErrorMessage)
                   .ToList();

                return new BadRequestObjectResult(new { message = "User Registration Failed", error });

            }

            var result = await _repository.Register(registerCredentials);

            if(result.Errors != null)
            {
                return BadRequest( new { message = $"OPPS! {result.Errors}" } );
            }
          
            return Ok(new { message = $"User Registration Successful {result.UserName}" });
            
            
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginCredentials credentials)
        {

            if (!ModelState.IsValid)
            {

                var error = ModelState.Values
                   .SelectMany(x => x.Errors)
                   .Select(err => err.ErrorMessage)
                   .ToList();

                return new BadRequestObjectResult(new { message = "User Login Failed", error });

            }
            
            var user = await _repository.Login(credentials);

            if(user is null)
            {
                return Unauthorized(new { message = "wrong credentials" } );
            }

            var token = user.Token;


            return Ok(new { Token = token, message = $"Welcome {user.UserName}" });
        }




        [HttpPost]
        [Route("account/login-google")]
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUrl = $"https://api.domain.com/identity/v1/account/external-auth-callback?returnUrl={returnUrl}";
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            properties.AllowRefresh = true;
            return Challenge(properties, provider);
        }








        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("user")]
        public async Task<IActionResult> GetInfoUser()
        {
            var email = HttpContext.User.Identity?.Name;

            var data = await _userManager.FindByNameAsync(email);


            if (data is null)
            {
                return Unauthorized();

            }

            var user = new UserInfo()
            {

                userId = data.Id,
                UserName = data.UserName,
                Email = data.Email

            };

            return Ok(new { info = user, message = "User is authorized" });
        }
    }

}
