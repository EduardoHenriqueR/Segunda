import { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";

function TarefaAlterar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Carregar as tarefas e as categorias ao inicializar o componente
  useEffect(() => {
    carregarTarefas();
    carregarCategorias();
  }, []);

  // Função para carregar as tarefas da API
  function carregarTarefas() {
    axios
      .get<Tarefa[]>("http://localhost:5267/api/tarefa/listar")
      .then((resposta) => {
        setTarefas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar tarefas:", erro);
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

  // Função para alterar o status da tarefa (sem precisar passar o novo estado)
  function alterarStatus(tarefaId: number) {
    // Enviar apenas o ID da tarefa para a API
    axios
      .patch(`http://localhost:5267/api/tarefa/alterar/${tarefaId}`)
      .then(() => {
        console.log("Status alterado com sucesso!");
        carregarTarefas(); // Recarregar as tarefas após a alteração
      })
      .catch((erro) => {
        console.error("Erro ao alterar o status da tarefa:", erro);
      });
  }

  // Função para mapear o estado numérico para o estado legível
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
    <div>
      <h1>Alterar Status das Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Alterar Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.id}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>
                {
                  categorias.find((categoria) => categoria.id === tarefa.categoriaId)
                    ?.nome
                }
              </td>
              <td>{mapearStatus(tarefa.estado)}</td>
              <td>
                <button onClick={() => alterarStatus(tarefa.id)}>
                  Alterar Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaAlterar;
