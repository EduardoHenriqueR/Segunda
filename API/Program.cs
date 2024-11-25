using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseSqlite("Data Source=Lista.db"));


// Configuração para serialização com suporte a referências circulares
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});


builder.Services.AddCors(
    options =>
        options.AddPolicy("Acesso Total",
            configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "To testando");

app.MapPost("/api/lista/cadastrar",([FromBody] Lista lista, [FromServices] AppDataContext ctx) => 
{
    if(lista == null)
    {
        return Results.BadRequest("Erro");
    }

    ctx.Listas.Add(lista);
    ctx.SaveChanges();
    return Results.Created($"/api/lista/{lista.Id}", lista);
    
});

app.MapGet("/api/lista/listar", ([FromServices]AppDataContext ctx) =>
{
     if(ctx.Listas.Any())
    {
        return Results.Ok(ctx.Listas.ToList());
    }
    return Results.NotFound();

});

app.MapDelete("/api/lista/deletar/{id}", async (int id, AppDataContext ctx) =>
{
    var lista = await ctx.Listas.FindAsync(id);
    if (lista == null)
    {
        return Results.NotFound("Insira um Id de lista valido.");
    }

    ctx.Listas.Remove(lista);
    ctx.SaveChanges();
    return Results.NoContent();

});

app.MapPost("/api/tarefa/cadastrar", (Tarefa tarefa, AppDataContext ctx) =>
{
    if(tarefa == null)
    {
        return Results.BadRequest("Prencha os campos obrigatorios.");
    }

    tarefa.Status = "Pendente";
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("Tarefa criada", tarefa);
});

app.MapGet("/api/tarefa/listar", ([FromServices] AppDataContext ctx) => {

   var tarefas = ctx.Tarefas.Include(a => a.Listas).ToList();
    
   return Results.Ok(tarefas);
    


});

app.MapPut("/api/tarefa/andamento/{id}", async (int id, AppDataContext ctx) => {

    var tarefa = await ctx.Tarefas.FindAsync(id);
    if(tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada.");
    }  

    if(tarefa.Status == "Pendente")
    {
        tarefa.Status = "Em Andamento";
        await ctx.SaveChangesAsync();
        return Results.NoContent();
    }
    if(tarefa.Status == "Em Andamento")
    {   
        tarefa.Status = "Cloncuida";
        await ctx.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.BadRequest("A tarefa não está em andamento.");

});

app.MapGet("/api/tarefa/concluidas", (AppDataContext ctx) =>
{
    var concluidas = ctx.Tarefas.Where(t => t.Status == "Concluída").ToList();
    Console.WriteLine($"Tarefas concluídas encontradas: {concluidas.Count}");
    return Results.Ok(concluidas);
});

app.MapGet("/api/tarefa/emandamento", (AppDataContext ctx) =>
{
    var emAndamento = ctx.Tarefas.Where(t => t.Status == "Em Andamento").ToList();
    
    return Results.Ok(emAndamento);
});

app.MapPut("/api/tarefa/deletar/{id}", async(int id, AppDataContext ctx )=> 
{
 var tarefa = await ctx.Tarefas.FindAsync(id);
    if (tarefa == null)
    {
        return Results.NotFound("Insira um Id de lista valido.");
    }

    ctx.Tarefas.Remove(tarefa);
    ctx.SaveChanges();
    return Results.NoContent();

});

app.UseCors("Acesso Total");
app.Run();
