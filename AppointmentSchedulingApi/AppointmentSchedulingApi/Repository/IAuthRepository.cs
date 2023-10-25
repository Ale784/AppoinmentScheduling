using AppointmentSchedulingApi.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApi.Repository
{
    public interface IAuthRepository
    {

        Task<UserReplyDTO> Login(LoginCredentials credentials);
        Task<UserReplyDTO> Register(RegisterCredentials registerCredentials);
       

    }
}
