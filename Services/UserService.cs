//using AutoMapper;
//using search_musics.Domain.Entities;
//using search_musics.Models;
//using search_musics.Models.AuthModels;
//using System.Drawing.Text;

//namespace search_musics.Services
//{
//    public class UserService
//    {
//        private readonly IEFRepository<User> _userRepository;
//        private readonly JwtService _jwtservice;
//        private readonly IMapper _mapper;

//        public UserService(IEFRepository<User> userRepository, JwtService jwtService, IMapper mapper)
//        {
//            _userRepository = userRepository;
//            _jwtservice = jwtService;
//            _mapper = mapper;
//        }

//        public AuthenticateResponse Auth(AuthenticateRequest model)
//        {
//            var user = _userRepository
//                .GetAll()
//                .FirstOrDefault(x => x.Username == model.UserName && x.Password == model.Password);
            
//            if (user == null)
//            {
//                return null;
//            }

//            var token = _jwtservice.GenerateJwtToken(user.Id.ToString(), user.Username );
//            return new AuthenticateResponse(user, token);
//        }

//        public async Task<AuthenticateResponse> Register(UserModel userModel)
//        {
//            var user = _mapper.Map<User>(userModel);

//            var addUser = await _userRepository.Add(user);

//            var response = Auth(new AuthenticateRequest
//            {
//                UserName = user.Username,
//                Password = user.Password
//            });

//            return response;
//        }
//        public IEnumerable<User> GetAll()
//        {
//            return _userRepository.GetAll();
//        }

//        public User GetById(int id)
//        {
//            return _userRepository.GetById(id);
//        }
//    }
//}
