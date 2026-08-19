namespace SubwatchApi.Models.DTOs
{
    public class AuthResult
    {
        public bool Succeeded { get; init; }
        public string? Token { get; init; }
        public IEnumerable<string> Errors { get; init; } = new List<string>();

        public static AuthResult Success(string token) => new AuthResult { Succeeded = true, Token = token };
        public static AuthResult Failure(IEnumerable<string> errors) => new AuthResult { Succeeded = false, Errors = errors };
    }
}