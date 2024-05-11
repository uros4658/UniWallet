using AppHack.Interfaces;
using AppHack.Service;
using Firebase.Auth.Providers;
using Firebase.Auth;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using System.Net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Load your service account credentials from the JSON file.
var googleCredential = GoogleCredential.FromFile(@"uniwalletcred.json");
var credential = googleCredential.UnderlyingCredential as ServiceAccountCredential;

// Add services to the container.
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"<uniwalletcred");
var firebaseApp = FirebaseApp.Create(new AppOptions { Credential = googleCredential });
builder.Services.AddSingleton(firebaseApp);
builder.Services.AddSingleton<IFirebaseAuthService, FirebaseAuthService>();
builder.Services.AddSingleton<NotificationService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add session services
builder.Services.AddSession();

// Add Razor Pages services and authorize a specific page
builder.Services.AddRazorPages(options =>
{
    options.Conventions.AuthorizePage("/Auth/AuthenticatedPage");
});

// Add Firebase Authentication services
var firebaseProjectName = credential.ProjectId;
builder.Services.AddSingleton(new FirebaseAuthClient(new FirebaseAuthConfig
{
    ApiKey = "AIzaSyCnNjMmu-8vFGdGjyqYhTJ-6TQS-g0Ja00\r\n",
    AuthDomain = $"{firebaseProjectName}.firebaseapp.com",
    Providers = new FirebaseAuthProvider[]
    {
        new EmailProvider(),
        new GoogleProvider()
    }
}));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"https://securetoken.google.com/{firebaseProjectName}";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = $"https://securetoken.google.com/{firebaseProjectName}",
            ValidateAudience = true,
            ValidAudience = firebaseProjectName,
            ValidateLifetime = true
        };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Use session middleware
app.UseSession();

app.Use(async (context, next) =>
{
    var token = context.Session.GetString("token");
    if (!string.IsNullOrEmpty(token))
    {
        context.Request.Headers.Add("Authorization", "Bearer " + token);
    }
    await next();
});

// Use status code pages middleware
app.UseStatusCodePages(async contextAccessor =>
{
    var response = contextAccessor.HttpContext.Response;

    if (response.StatusCode == (int)HttpStatusCode.Unauthorized)
    {
        response.Redirect("/Auth/UnauthenticatedPage");
    }
});

app.MapControllers();

app.Run();
