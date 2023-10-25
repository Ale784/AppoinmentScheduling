using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApi.DTO
{
    public class UserReplyDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public object Token { get; set; }
        public string Errors { get; set; }

    }
}
