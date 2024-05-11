using System.Threading.Tasks;

namespace AppHack.Interfaces
{
    public interface IFirebaseAuthService
    {
        Task<string?> SignUp(string email, string password);
        Task<string?> Login(string email, string password);
        void SignOut();
    }
}
