using System;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class Tarefa
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public string Status { get; set; }
    public bool EmAndamento { get; set; } = false;
    public Lista Lista { get; set; }
    public int ListaId { get; set; }

}
