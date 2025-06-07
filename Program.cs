using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using search_musics.Domain;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace search_musics
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

            var connectionString = builder.Configuration.GetConnectionString("Default");
            
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
            
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            var jwtSettings = builder.Configuration.GetSection("JwtSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllApps",
                    builder => builder
                        .WithOrigins("https://spaicy.ru", "http://localhost:5173", "https://localhost:7285") // Разрешаем оба источника
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });

            var app = builder.Build();

            //FileServerOptions fileServerOptions = new FileServerOptions();
            //fileServerOptions.DefaultFilesOptions.DefaultFileNames.Clear();
            //fileServerOptions.DefaultFilesOptions.DefaultFileNames.Add("Index.cshtml");


            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            //app.UseFileServer(fileServerOptions);
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCors("AllowAllApps");


            app.Use(async (context, next) =>
            {
                var logger = context.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("ProxyMiddleware");

                var path = context.Request.Path;
                logger.LogInformation($"Request path: {path}");

                if (path.StartsWithSegments("/v1", out var remainingPath))
                {
                    logger.LogInformation($"Proxying to localhost:7285 path: {remainingPath}");

                    var query = context.Request.QueryString.HasValue ? context.Request.QueryString.Value : "";
                    var targetUrl = $"https://localhost:7285/v1{remainingPath}{query}";

                    var handler = new HttpClientHandler
                    {
                        ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                    };

                    using var client = new HttpClient(handler);
                    var requestMessage = new HttpRequestMessage(new HttpMethod(context.Request.Method), targetUrl);

                    foreach (var header in context.Request.Headers)
                    {
                        if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()))
                        {
                            requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                        }
                    }

                    var response = await client.SendAsync(requestMessage);

                    context.Response.StatusCode = (int)response.StatusCode;

                    foreach (var header in response.Headers)
                    {
                        context.Response.Headers[header.Key] = header.Value.ToArray();
                    }
                    foreach (var header in response.Content.Headers)
                    {
                        context.Response.Headers[header.Key] = header.Value.ToArray();
                    }

                    var body = await response.Content.ReadAsStringAsync();
                    await context.Response.WriteAsync(body);

                    return;
                }

                await next();
            });


            app.UseRouting();


            app.UseAuthorization();
            app.UseAuthentication();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
