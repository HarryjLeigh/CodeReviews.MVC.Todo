using Microsoft.EntityFrameworkCore;
using TodoList.Controllers;
using TodoList.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure Entity Framework to use SQL Server with connection string
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Build the app pipeline
var app = builder.Build();

// Show detailed errors in development
if (app.Environment.IsDevelopment())
    app.UseDeveloperExceptionPage();

// Configure middleware and endpoints
app
    .UseDefaultFiles() // Serve default files like index.html
    .UseStaticFiles() // Serve static assets (CSS, JS)
    .UseHttpsRedirection(); // Redirect HTTP to HTTPS for security

// Endpoint mapping:
app.MapApiEndpoints(); // Map custom minimal API endpoints

app.Run(); // Start the application