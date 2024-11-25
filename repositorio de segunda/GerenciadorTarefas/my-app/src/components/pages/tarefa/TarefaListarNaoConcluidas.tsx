import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import "./TarefaListar.css";
import axios from "axios";
import { Categoria } from "../../../models/Categoria";

function TarefaListarNaoConcluidas() {
  const [tarefasNaoConcluidas, setTarefasNaoConcluidas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    pesquisarTarefasNaoConcluidas();
    carregarCategorias();
  }, []); // A dependência de array vazio faz a pesquisa apenas na primeira renderização

  function pesquisarTarefasNaoConcluidas() {
    fetch("http://localhost:5267/api/tarefa/naoconcluidas")  // Atualize para o endpoint correto que lista as tarefas não concluídas
      .then((resposta) => resposta.json())
      .then((tarefas) => {
        setTarefasNaoConcluidas(tarefas);
      });
  }

    // Função para carregar as categorias da API
    function carregarCategorias() {
        axios
          .get<Categoria[]>("http://localhost:5267/api/categoria/listar")
          .then((resposta) => {
            setCategorias(resposta.data);
          })
          .catch((erro) => {
            console.error("Erro ao carregar categorias:", erro);
          });
      }

  // Função para mapear o valor do enum para o status legível
  function mapearStatus(estado: number): string {
    switch (estado) {
      case 0:
        return "Pendente";
      case 1:
        return "Em Andamento";
      case 2:
        return "Concluído";
      default:
        return "Status desconhecido";
    }
  }



  return (
    <div id="listar_tarefas_nao_concluidas">
      <h1>Lista de Tarefas Não Concluídas</h1>
      <table id="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefasNaoConcluidas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>
                  {categorias.find((categoria) => categoria.id === tarefa.categoriaId)
                    ?.nome}
             </td>
              <td>{mapearStatus(tarefa.estado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function alterarStatusTarefa(tarefaId: number) {
    fetch(`http://localhost:5267/api/tarefa/alterar/${tarefaId}`, {
      method: "PATCH",
    })
      .then((resposta) => resposta.json())
      .then(() => {
        // Atualiza a lista de tarefas após alterar o status
        pesquisarTarefasNaoConcluidas();
      })
      .catch((erro) => console.error("Erro ao alterar status da tarefa:", erro));
  }
}

export default TarefaListarNaoConcluidas;
