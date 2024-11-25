using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace API.Models;

public class Tarefa 
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public string Status { get; set; }
    public bool EmAndamento { get; set; }
    public Lista Listas { get; set; }
    public int ListaId { get; set; }

}