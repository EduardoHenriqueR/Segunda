import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import "./TarefaListar.css";
import { Categoria } from "../../../models/Categoria";
import axios from "axios";

function TarefaListar(){

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);  // Novo estado para armazenar as categorias


  useEffect(() => {
    pesquisarTarefas();
    buscarCategorias();
  }, []); // Adicionando a dependência de array vazio para carregar apenas na primeira renderização

  function pesquisarTarefas() {
    fetch("http://localhost:5267/api/tarefa/listar")  // Atualizando para o novo endpoint
      .then((resposta) => resposta.json())
      .then((tarefas) => {
        setTarefas(tarefas);
      });
  }

   // Função para buscar as categorias
   function buscarCategorias() {
    fetch("http://localhost:5267/api/categoria/listar")  // Endpoint para listar categorias
      .then((resposta) => resposta.json())
      .then((categorias) => {
        setCategorias(categorias);
      });
  }

  // Função para encontrar o nome da categoria pelo id
  function obterCategoriaNome(categoriaId: number): string {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nome : "Categoria desconhecida"; // Retorna o nome ou "Categoria desconhecida"
  }

   // Função para mapear o valor do enum para o status legível
   function mapearStatus(estado: number): string {
    console.log("Estado " +estado);
    switch (estado) {
      case 0:
        return "Não Iniciada";
      case 1:
        return "Em Andamento";
      case 2:
        return "Concluída";
      default:
        return "Status desconhecido";
    }
  }

  function deletar(id : number){
    console.log("id :" + id)
    axios.delete("http://localhost:5267/api/tarefa/deletar/" + id)
    .then( resposta => {
        console.log(resposta.data) 
    });
  }

  return (
    <div id="listar_tarefas">
      <h1>Lista de Tarefas</h1>
      <table id="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
               <td>{obterCategoriaNome(tarefa.categoriaId)}</td>
              <td>{mapearStatus(tarefa.estado)}</td>
              <td>
                <button onClick={ () => deletar(tarefa.id) }>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaListar;