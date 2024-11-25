using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace API.Models;

public class Lista
{
    public int Id { get; set; }
    public string Nome { get; set; }
}