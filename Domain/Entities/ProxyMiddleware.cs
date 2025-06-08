namespace search_musics.Domain.Entities
{
    public class ProxyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly HttpClient _httpClient;
        private readonly string _targetBaseUrl;

        public ProxyMiddleware(RequestDelegate next, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _next = next;
            _httpClient = httpClientFactory.CreateClient();
            _targetBaseUrl = "http://localhost:5206"; // например: http://external-server.local
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var targetUri = BuildTargetUri(context.Request);
            if (targetUri == null || !context.Request.Path.StartsWithSegments("/Home"))
            {
                await _next(context); // если не проксировать — передай дальше
                return;
            }
            var requestMessage = CreateTargetMessage(context, targetUri);

            using var responseMessage = await _httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted);

            context.Response.StatusCode = (int)responseMessage.StatusCode;
            foreach (var header in responseMessage.Headers)
            {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }

            foreach (var header in responseMessage.Content.Headers)
            {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }

            context.Response.Headers.Remove("transfer-encoding"); // устранить дубли

            await responseMessage.Content.CopyToAsync(context.Response.Body);
        }

        private Uri? BuildTargetUri(HttpRequest request)
        {
            var path = request.Path.ToString();
            var query = request.QueryString.ToString();

            // Можно добавить фильтрацию пути, если нужно проксировать не всё подряд
            return new Uri($"{_targetBaseUrl}{path}{query}");
        }

        private HttpRequestMessage CreateTargetMessage(HttpContext context, Uri targetUri)
        {
            var requestMessage = new HttpRequestMessage
            {
                Method = new HttpMethod(context.Request.Method),
                RequestUri = targetUri,
            };

            // Копируем тело запроса
            if (!HttpMethods.IsGet(context.Request.Method) &&
                !HttpMethods.IsHead(context.Request.Method) &&
                !HttpMethods.IsDelete(context.Request.Method) &&
                !HttpMethods.IsTrace(context.Request.Method))
            {
                context.Request.EnableBuffering();
                context.Request.Body.Position = 0;
                requestMessage.Content = new StreamContent(context.Request.Body);
            }

            // Копируем заголовки
            foreach (var header in context.Request.Headers)
            {
                if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()))
                {
                    requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                }
            }

            return requestMessage;
        }
    }

}
