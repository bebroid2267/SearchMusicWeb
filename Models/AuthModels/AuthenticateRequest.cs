using System.ComponentModel.DataAnnotations;

namespace search_musics.Models.AuthModels
{
    public class AuthenticateRequest
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
