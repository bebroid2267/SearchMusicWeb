using search_musics.Domain.Entities;

namespace search_musics.Services
{
    public interface IEFRepository<T> where T : BaseEntity
    {
        List<T> GetAll();
        T GetById(long id);

        Task<long> Add(T entity);
    }
}
