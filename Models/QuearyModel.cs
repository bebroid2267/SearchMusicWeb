using System.ComponentModel.DataAnnotations;

namespace search_musics.Models
{
    public class QuearyModel
    {
        [Required(ErrorMessage = "Ты собираешься искать пустоту?")]
        public string Queary { get; set; }
    }
}
