using System;
using Microsoft.EntityFrameworkCore;

namespace API.Models;
public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) {}

    public DbSet<Tarefa> Tarefas {get; set;}
    public DbSet<Lista> Listas {get; set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Lista.db");
    }
}