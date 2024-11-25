using System;

namespace API.Models;

public class Tarefa
{
    public int Id { get; set; } // Chave primária
    public string Titulo { get; set; } = string.Empty; // Título da tarefa
    public string Descricao { get; set; } = string.Empty; // Descrição da tarefa
    public EstadoTarefa Estado { get; set; } = EstadoTarefa.Pendente; // Estado da tarefa
    public DateTime DataCriacao { get; set; } = DateTime.Now; // Data de criação
    public int CategoriaId { get; set; } // Chave estrangeira
    public Categoria Categoria { get; set; } // Navegação para Categoria
}
