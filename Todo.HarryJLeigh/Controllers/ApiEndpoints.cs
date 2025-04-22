using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.Models;

namespace TodoList.Controllers;

public static class ApiEndpoints
{
    // Register API routes
    public static IEndpointRouteBuilder MapApiEndpoints(this IEndpointRouteBuilder app)
    {
        var groupTodo = app.MapGroup("api/todoItems");
        groupTodo.MapGet("/", GetAllTodos);
        groupTodo.MapPost("/", CreateTodo);
        groupTodo.MapDelete("/{id}", DeleteTodo);
        groupTodo.MapPut("/{id}", UpdateTodo);
        return app;
    }

    // GET /api/todoItems
    private static async Task<IResult> GetAllTodos(TodoContext db)
    {
        return TypedResults.Ok(await db.TodoItems.Select(
            x => x).ToArrayAsync());
    }

    // POST /api/todoItems
    private static async Task<IResult> CreateTodo(TodoItem todo, TodoContext db)
    {
        var todoItem = new TodoItem
        {
            IsComplete = todo.IsComplete,
            Name = todo.Name
        };
        db.TodoItems.Add(todoItem);
        await db.SaveChangesAsync();
        return TypedResults.Created($"/todoItems/{todoItem.Id}", todo);
    }

    // DELETE /api/todoItems/{id}
    private static async Task<IResult> DeleteTodo(int id, TodoContext db)
    {
        var todo = await db.TodoItems.FindAsync(id);
        if (todo is not null)
        {
            db.TodoItems.Remove(todo);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }

    // PUT /api/todoItems/{id}
    private static async Task<IResult> UpdateTodo(TodoItem todoItem, TodoContext db)
    {
        var todo = await db.TodoItems.FindAsync(todoItem.Id);

        if (todo is not null)
        {
            todo.Name = todoItem.Name;
            todo.IsComplete = todoItem.IsComplete;
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }
}