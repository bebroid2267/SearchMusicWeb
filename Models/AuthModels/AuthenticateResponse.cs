using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using search_musics.Domain.Entities;

namespace search_musics.Models.AuthModels
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email{ get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            UserName = user.Username;
            Email = user.Email;
            Token = token;
        }
    }
}
