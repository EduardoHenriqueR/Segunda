
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


//Adicionando o serviço de banco de dados na aplicação
builder.Services.AddDbContext<AppDataContext>();

//Problema de cors
builder.Services.AddCors(
    options =>
        options.AddPolicy("Acesso Total",
            configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
);


var app = builder.Build();

// Home
app.MapGet("/", () => "API de Tarefas");

// GET: /api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
    ctx.Categorias.Any() ? Results.Ok(ctx.Categorias.ToList()) : Results.NotFound());

// POST: /api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromBody] Categoria categoria,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

// ################## TAREFA

// GET: /api/tarefa/listar
app.MapGet("/api/tarefa/listar", ([FromServices] AppDataContext ctx) =>
    ctx.Tarefas.Include(t => t.Categoria).ToList());

// GET: /api/tarefa/concluidas
app.MapGet("/api/tarefa/concluidas", ([FromServices] AppDataContext ctx) =>
    ctx.Tarefas.Where(t => t.Estado == EstadoTarefa.Concluido).ToList());

// GET: /api/tarefa/naoconcluidas
app.MapGet("/api/tarefa/naoconcluidas", ([FromServices] AppDataContext ctx) =>
    ctx.Tarefas.Where(t => t.Estado != EstadoTarefa.Concluido).ToList());

// POST: /api/tarefa/cadastrar
app.MapPost("/api/tarefa/cadastrar", ([FromBody] Tarefa tarefa,
    [FromServices] AppDataContext ctx) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria is null)
        return Results.NotFound("Categoria não encontrada");

    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// PATCH: /api/tarefa/alterar/{id}
app.MapPatch("/api/tarefa/alterar/{id}", ([FromRoute] int id,
    [FromServices] AppDataContext ctx) =>
{
    var tarefa = ctx.Tarefas.Find(id);
    if (tarefa is null)
        return Results.NotFound("Tarefa não encontrada");

    // Alterna o estado
    tarefa.Estado = tarefa.Estado switch
    {
        EstadoTarefa.Pendente => EstadoTarefa.EmAndamento,
        EstadoTarefa.EmAndamento => EstadoTarefa.Concluido,
        _ => tarefa.Estado
    };

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//DELETE: /api/tarefa/deletar/{id}
app.MapDelete("/api/tarefa/deletar/{id}", ([FromRoute] int id,
    [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa == null)
    {
        return Results.NotFound();
    }
    ctx.Tarefas.Remove(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//Problema de cors
app.UseCors("Acesso Total");

app.Run();
